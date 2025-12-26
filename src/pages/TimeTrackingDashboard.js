import React, { useState, useEffect, useCallback } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  useToast,
  useBreakpointValue,
  useColorModeValue,
  Flex,
  Stack,
  StackDivider,
  Text,
} from '@chakra-ui/react';
import {
  getTimeEntries,
  getTimeEntriesSummary,
} from '../lib/supabase/timeEntries';
import MetaTags from '../components/MetaTags';
import SummaryCard from '../components/dashboard/SummaryCard';
import ChartCard from '../components/dashboard/ChartCard';
import CategoryPieChart from '../components/dashboard/CategoryPieChart';
import TimelineAreaChart from '../components/dashboard/TimelineAreaChart';
import GameBarChart from '../components/dashboard/GameBarChart';
import PlatformPieChart from '../components/dashboard/PlatformPieChart';
import GameDataTable from '../components/dashboard/GameDataTable';
import IntroText from '../components/dashboard/IntroText';
import {
  formatHoursToTime,
  formatHoursToStructured,
} from '../utils/timeFormatting';
import compGames from '../data/2025_comp_games.json';
import CompletedGames2025 from '../components/dashboard/CompletedGames2025';

const TimeTrackingDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [gameDevData, setGameDevData] = useState([]);
  const [artDrawingData, setArtDrawingData] = useState([]);
  const [professionalDevData, setProfessionalDevData] = useState([]);
  const toast = useToast();
  const completedGamesColumns = useBreakpointValue({ base: 1, md: 3 });

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const spinnerColor = useColorModeValue(
    'hookersGreen.500',
    'hookersGreen.300'
  );

  // Original color scheme
  const colors = {
    chart1: '#f9cff2', // mimiPink
    chart2: '#dae0f2', // lavenderWeb
    chart3: '#607466', // hookersGreen
    gradient1: '#f9cff2',
    gradient2: '#f9cff2',
    barColors: [
      '#f9cff2',
      '#dae0f2',
      '#607466',
      '#efb5b8',
      '#9eaea3',
      '#f2edeb',
      '#e1e6f4',
      '#fad7f4',
    ],
  };

  // Helper function to render pie chart cards
  const renderPieChartCard = (title, data) => {
    if (data.length === 0) return null;
    return (
      <Card boxShadow="dark-lg" bg={cardBg}>
        <CardHeader>
          <Heading size={{ base: 'sm', md: 'md' }} align="center">
            {title}
          </Heading>
        </CardHeader>
        <CardBody px={{ base: 2, md: 4 }}>
          <PlatformPieChart data={data} barColors={colors.barColors} />
        </CardBody>
      </Card>
    );
  };

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      const [entriesData, summaryData] = await Promise.all([
        getTimeEntries(),
        getTimeEntriesSummary(),
      ]);

      setSummary(summaryData);
      processChartData(entriesData, summaryData);
    } catch (error) {
      console.error('Error loading time tracking data:', error);
      toast({
        title: 'Error loading data',
        description: error.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const processChartData = (entriesData, summaryData) => {
    // Process project hours data
    const projectHours = {};
    entriesData.forEach((entry) => {
      const project = entry.project || 'Unassigned';
      const hours = entry.duration_seconds / 3600;

      if (!projectHours[project]) {
        projectHours[project] = 0;
      }
      projectHours[project] += hours;
    });

    const projectChartData = Object.entries(projectHours)
      .map(([name, hours]) => ({
        name,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 10);

    setProjectData(projectChartData);

    // Process timeline data (hours per month)
    const monthlyHours = {};
    entriesData.forEach((entry) => {
      const date = new Date(entry.start_date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      const hours = entry.duration_seconds / 3600;

      if (!monthlyHours[monthKey]) {
        monthlyHours[monthKey] = 0;
      }
      monthlyHours[monthKey] += hours;
    });

    const timelineChartData = Object.entries(monthlyHours)
      .map(([monthKey, hours]) => ({
        month: monthKey,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => a.month.localeCompare(b.month));

    setTimelineData(timelineChartData);

    // Process game hours data
    const gameHours = {};
    entriesData
      .filter((entry) => {
        const project = entry.project || '';
        return project === 'Playing Video Games';
      })
      .forEach((entry) => {
        const gameName = entry.task || 'Unknown Game';
        const hours = entry.duration_seconds / 3600;

        if (!gameHours[gameName]) {
          gameHours[gameName] = 0;
        }
        gameHours[gameName] += hours;
      });

    const gameChartData = Object.entries(gameHours)
      .map(([name, hours]) => ({
        name,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => b.hours - a.hours);

    setGameData(gameChartData);

    // Process platform/tag hours data
    const platformHours = {};
    entriesData
      .filter((entry) => {
        const project = entry.project || '';
        return project === 'Playing Video Games';
      })
      .forEach((entry) => {
        const platform =
          entry.tags && entry.tags.length > 0 ? entry.tags[0] : 'Unknown';
        const hours = entry.duration_seconds / 3600;

        if (!platformHours[platform]) {
          platformHours[platform] = 0;
        }
        platformHours[platform] += hours;
      });

    const platformChartData = Object.entries(platformHours)
      .map(([name, hours]) => ({
        name,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => b.hours - a.hours);

    setPlatformData(platformChartData);

    // Process Game Dev hours data (tasks within Game Dev project)
    const gameDevHours = {};
    entriesData
      .filter((entry) => {
        const project = entry.project || '';
        return project === 'Game Dev';
      })
      .forEach((entry) => {
        const taskName = entry.task || 'Unknown Task';
        const hours = entry.duration_seconds / 3600;

        if (!gameDevHours[taskName]) {
          gameDevHours[taskName] = 0;
        }
        gameDevHours[taskName] += hours;
      });

    const gameDevChartData = Object.entries(gameDevHours)
      .map(([name, hours]) => ({
        name,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => b.hours - a.hours);

    setGameDevData(gameDevChartData);

    // Process Art/Drawing hours data (tasks within Art/Drawing project)
    const artDrawingHours = {};
    entriesData
      .filter((entry) => {
        const project = entry.project || '';
        return project === 'Art/Drawing';
      })
      .forEach((entry) => {
        const taskName = entry.task || 'Unknown Task';
        const hours = entry.duration_seconds / 3600;

        if (!artDrawingHours[taskName]) {
          artDrawingHours[taskName] = 0;
        }
        artDrawingHours[taskName] += hours;
      });

    const artDrawingChartData = Object.entries(artDrawingHours)
      .map(([name, hours]) => ({
        name,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => b.hours - a.hours);

    setArtDrawingData(artDrawingChartData);

    // Process Coding hours data (categorized by tags within Coding project)
    const professionalDevHours = {};
    entriesData
      .filter((entry) => {
        const project = entry.project || '';
        return project === 'Coding';
      })
      .forEach((entry) => {
        const tagName =
          entry.tags && entry.tags.length > 0 ? entry.tags[0] : 'Uncategorized';
        const hours = entry.duration_seconds / 3600;

        if (!professionalDevHours[tagName]) {
          professionalDevHours[tagName] = 0;
        }
        professionalDevHours[tagName] += hours;
      });

    const professionalDevChartData = Object.entries(professionalDevHours)
      .map(([name, hours]) => ({
        name,
        hours: parseFloat(hours.toFixed(2)),
      }))
      .sort((a, b) => b.hours - a.hours);

    setProfessionalDevData(professionalDevChartData);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="50vh"
      >
        <Spinner size="xl" color={spinnerColor} thickness="4px" />
      </Box>
    );
  }

  return (
    <>
      <MetaTags
        title="Garrett Conn | Time Tracking Dashboard 2025"
        description="Time tracking analytics and insights"
        keywords="time tracking, productivity, analytics"
        url="https://garrettconn.com/time-tracking"
      />
      <Container
        maxW="container.xl"
        px={{ base: 4, md: 6 }}
        py={{ base: 4, md: 6 }}
        width={{ base: '100%', md: '90vw' }}
      >
        <Heading
          align="center"
          bg="brand.primary"
          color="white"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
          padding={{ base: 5, md: 30 }}
        >
          Hobby Time - 2025
        </Heading>
        <Card boxShadow={'dark-lg'} mb={4} bg={cardBg}>
          <CardHeader>
            <Heading size={{ base: 'sm', md: 'md' }} align="center"></Heading>
          </CardHeader>
          <CardBody
            mx={{ base: '5', md: '20' }}
            mb={{ base: '5', md: '10' }}
            opacity={0}
            animation="fadeIn 1s ease-in forwards"
            sx={{
              '@keyframes fadeIn': {
                '0%': {
                  opacity: 0,
                  transform: 'translatey(30px)',
                },
                '100%': {
                  opacity: 1,
                  transform: 'translatey(0)',
                },
              },
            }}
          >
            <IntroText></IntroText>
          </CardBody>
        </Card>
        {/* Completed Games Section */}
        <CompletedGames2025 />
        {/* Summary Cards */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 4 }}
          mb={8}
        >
          <Card boxShadow={'dark-lg'} bg={cardBg}>
            <CardHeader>
              <Heading size={{ base: 'sm', md: 'md' }} align="center">
                Hobbies
              </Heading>
            </CardHeader>
            <CardBody>
              <Box fontSize={{ base: 'sm', md: 'm', lg: 'xl' }}>
                {projectData.map((project, index) => {
                  const time = formatHoursToStructured(project.hours);
                  return (
                    <Flex key={index}>
                      <Box flex="1" fontWeight="bold">
                        {project.name}
                      </Box>
                      <Flex
                        gap={1}
                        justifyContent={'flex-end'}
                        fontVariantNumeric="tabular-nums"
                      >
                        <Flex minW="3ch" justifyContent="flex-end">
                          <Text>{time.hasHours ? time.hours : ''}</Text>
                        </Flex>
                        <Text minW="1ch">{time.hasHours ? 'h' : ''}</Text>
                        <Flex minW="3ch" justifyContent="flex-end">
                          <Text>{time.minutes}</Text>
                        </Flex>
                        <Text minW="1ch">m</Text>
                        <Flex minW="3ch" justifyContent="flex-end">
                          <Text>{time.seconds}</Text>
                        </Flex>
                        <Text minW="1ch">s</Text>
                      </Flex>
                    </Flex>
                  );
                })}
              </Box>
            </CardBody>
          </Card>
          <SummaryCard
            stats={[
              {
                label: 'Total Hobby Time',
                value: formatHoursToTime(
                  summary?.totalDurationHours || 0,
                  true
                ),
              },
              {
                label: 'Active Hobbies',
                value: summary?.projects.length,
              },
              {
                label: 'Total Entries',
                value: summary?.totalEntries,
              },
              {
                label: 'Games Completed',
                value: compGames?.length,
              },
              {
                label: 'Games Played',
                value: gameData.length,
              },
            ]}
          />
          <Card boxShadow="dark-lg" bg={cardBg}>
            <CardHeader>
              <Heading size="md">Completed Games</Heading>
            </CardHeader>
            <SimpleGrid
              columns={{ base: 1, md: 4 }}
              spacing={{ base: 0, md: 3 }}
            >
              {(() => {
                const columns = completedGamesColumns || 1;
                const itemsPerColumn = Math.ceil(compGames.length / columns);
                return Array.from({ length: columns }, (_, colIndex) => {
                  const startIdx = colIndex * itemsPerColumn;
                  const columnGames = compGames.slice(
                    startIdx,
                    startIdx + itemsPerColumn
                  );
                  if (columnGames.length === 0) return null;
                  return (
                    <CardBody key={colIndex}>
                      <Stack divider={<StackDivider />} spacing="4">
                        {columnGames.map((game, index) => (
                          <Box key={index}>
                            <Text fontSize="sm">{game.name}</Text>
                          </Box>
                        ))}
                      </Stack>
                    </CardBody>
                  );
                });
              })()}
            </SimpleGrid>
            {/* Project Hours Chart */}
          </Card>
          <ChartCard title="Total Time by Category">
            <CategoryPieChart data={projectData} barColors={colors.barColors} />
          </ChartCard>
        </SimpleGrid>
        {/* Charts */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 6 }}
          mb={8}
        >
          {/* Timeline Chart */}
          <ChartCard title="Hobby Time Per Month">
            <TimelineAreaChart
              data={timelineData}
              gradientColor1={colors.gradient1}
              gradientColor2={colors.gradient2}
              lineColor={colors.chart3}
            />
          </ChartCard>

          {/* Video Game Hours Chart */}
          {gameData.length > 0 && (
            <ChartCard title="Time by Video Game (Top 10)">
              <GameBarChart data={gameData} barColors={colors.barColors} />
            </ChartCard>
          )}
          {renderPieChartCard('Time by Platform', platformData)}
          {renderPieChartCard('Game Dev', gameDevData)}
          {renderPieChartCard('Art/Drawing', artDrawingData)}
          {renderPieChartCard('Coding', professionalDevData)}
        </SimpleGrid>
        {/* Video Games List */}
        <Heading size="md" mb={4}>
          Total Time by Game
        </Heading>
        {gameData.length > 0 && (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={{ base: 0, md: 6 }}
            mb={4}
          >
            <GameDataTable
              data={gameData.slice(0, Math.ceil(gameData.length / 2))}
              showHeader={true}
            />
            <GameDataTable
              data={gameData.slice(Math.ceil(gameData.length / 2))}
              showHeader={false}
            />
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default TimeTrackingDashboard;

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
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  getTimeEntries,
  getTimeEntriesSummary,
} from '../lib/supabase/timeEntries';
import MetaTags from '../components/MetaTags';
import ColorSchemeSwitcher, {
  colorSchemes,
} from '../components/ColorSchemeSwitcher';
import SummaryCard from '../components/dashboard/SummaryCard';
import ChartCard from '../components/dashboard/ChartCard';
import CategoryBarChart from '../components/dashboard/CategoryBarChart';
import TimelineAreaChart from '../components/dashboard/TimelineAreaChart';
import GameBarChart from '../components/dashboard/GameBarChart';
import PlatformPieChart from '../components/dashboard/PlatformPieChart';
import GameDataTable from '../components/dashboard/GameDataTable';
import { formatHoursToTime } from '../utils/timeFormatting';

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
  const [currentColorScheme, setCurrentColorScheme] = useState('original');
  const toast = useToast();

  const colors = colorSchemes[currentColorScheme];

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
        <Spinner size="xl" color="hookersGreen.500" thickness="4px" />
      </Box>
    );
  }

  return (
    <>
      <MetaTags
        title="Garrett Conn | Time Tracking Dashboard"
        description="Time tracking analytics and insights"
        keywords="time tracking, productivity, analytics"
        url="https://garrettconn.com/time-tracking"
      />
      <Container maxW="container.xl" px={{ base: 4, md: 6 }}>
        <Heading
          align="center"
          mx={{ base: 2, md: 8 }}
          my={{ base: 6, md: 8 }}
          color="blackBean.700"
          fontSize={{ base: '2xl', md: '3xl', lg: '4xl' }}
        >
          Hobby Time - 2025
        </Heading>

        {/* Summary Cards */}
        <SimpleGrid
          columns={{ base: 1, sm: 2 }}
          spacing={{ base: 4, md: 6 }}
          mb={8}
        >
          <SummaryCard
            label="Hobby Time"
            value={formatHoursToTime(summary?.totalDurationHours || 0)}
            helpText={`${summary?.totalEntries} entries`}
          />
          <SummaryCard
            label="Categories"
            value={summary?.projects.length}
            helpText="Active projects"
          />
        </SimpleGrid>

        {/* Charts */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 6 }}
          mb={8}
        >
          {/* Project Hours Chart */}
          <ChartCard title="Total Time by Category">
            <CategoryBarChart data={projectData} barColors={colors.barColors} />
          </ChartCard>

          {/* Timeline Chart */}
          <ChartCard title="Free Time Per Month">
            <TimelineAreaChart
              data={timelineData}
              gradientColor1={colors.gradient1}
              gradientColor2={colors.gradient2}
              lineColor={colors.chart3}
            />
          </ChartCard>
        </SimpleGrid>

        {/* Charts */}
        <SimpleGrid
          columns={{ base: 1, md: 2 }}
          spacing={{ base: 4, md: 6 }}
          mb={8}
        >
          {/* Video Game Hours Chart */}
          {gameData.length > 0 && (
            <ChartCard title="Time by Video Game (Top 10)">
              <GameBarChart data={gameData} barColors={colors.barColors} />
            </ChartCard>
          )}
          {/* Platform Pie Chart */}
          {platformData.length > 0 && (
            <Card boxShadow={'2xl'}>
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} align="center">
                  Time by Platform
                </Heading>
              </CardHeader>
              <CardBody px={{ base: 2, md: 4 }}>
                <PlatformPieChart
                  data={platformData}
                  barColors={colors.barColors}
                />
              </CardBody>
            </Card>
          )}
          {/* Game Dev Pie Chart */}
          {gameDevData.length > 0 && (
            <Card boxShadow={'2xl'}>
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} align="center">
                  Game Dev Tasks
                </Heading>
              </CardHeader>
              <CardBody px={{ base: 2, md: 4 }}>
                <PlatformPieChart
                  data={gameDevData}
                  barColors={colors.barColors}
                />
              </CardBody>
            </Card>
          )}
          {/* Art/Drawing Pie Chart */}
          {artDrawingData.length > 0 && (
            <Card boxShadow={'2xl'}>
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} align="center">
                  Art/Drawing Tasks
                </Heading>
              </CardHeader>
              <CardBody px={{ base: 2, md: 4 }}>
                <PlatformPieChart
                  data={artDrawingData}
                  barColors={colors.barColors}
                />
              </CardBody>
            </Card>
          )}
          {/* Coding Pie Chart */}
          {professionalDevData.length > 0 && (
            <Card boxShadow={'2xl'}>
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} align="center">
                  Coding Tasks
                </Heading>
              </CardHeader>
              <CardBody px={{ base: 2, md: 4 }}>
                <PlatformPieChart
                  data={professionalDevData}
                  barColors={colors.barColors}
                />
              </CardBody>
            </Card>
          )}
        </SimpleGrid>

        {/* Summary Card */}
        <Card mb={5} boxShadow={'2xl'}>
          <CardHeader>
            <Heading size={{ base: 'sm', md: 'md' }}>Summary</Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1 }} spacing={4}>
              <Box>
                <Text
                  fontWeight="semibold"
                  mb={2}
                  fontSize={{ base: 'sm', md: 'md' }}
                >
                  Top Categories:
                </Text>
                {projectData.slice(0, 5).map((project, index) => (
                  <Text
                    key={index}
                    fontSize={{ base: 'xs', md: 'sm' }}
                    color="gray.600"
                  >
                    • {project.name}: {formatHoursToTime(project.hours)}
                  </Text>
                ))}
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Video Games List */}
        {gameData.length > 0 && (
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 0, md: 6 }}>
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

      {
        /* Color Scheme Switcher */
        <ColorSchemeSwitcher
          currentScheme={currentColorScheme}
          onSchemeChange={setCurrentColorScheme}
        />
      }
    </>
  );
};

export default TimeTrackingDashboard;

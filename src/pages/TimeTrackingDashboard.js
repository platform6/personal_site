import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Card,
  CardHeader,
  CardBody,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import {
  getTimeEntries,
  getTimeEntriesSummary,
} from '../lib/supabase/timeEntries';
import Layout from '../components/Layout';
import MetaTags from '../components/MetaTags';

const TimeTrackingDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [entries, setEntries] = useState([]);
  const [projectData, setProjectData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const toast = useToast();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      // Fetch all time entries and summary
      const [entriesData, summaryData] = await Promise.all([
        getTimeEntries(),
        getTimeEntriesSummary(),
      ]);

      setEntries(entriesData);
      setSummary(summaryData);

      // Process data for charts
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
  };

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
      .slice(0, 10); // Top 10 projects

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
      .sort((a, b) => a.month.localeCompare(b.month)); // Sort chronologically

    setTimelineData(timelineChartData);

    // Process game hours data (filter for gaming categories)
    const gameHours = {};
    entriesData
      .filter((entry) => {
        // Filter entries where project is exactly "Playing Video Games"
        const project = entry.project || '';
        return project === 'Playing Video Games';
      })
      .forEach((entry) => {
        // Use task column as game name
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
      .sort((a, b) => b.hours - a.hours)
      .slice(0, 10); // Top 10 games

    setGameData(gameChartData);
  };

  if (loading) {
    return (
      <Layout>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          minH="50vh"
        >
          <Spinner size="xl" color="hookersGreen.500" thickness="4px" />
        </Box>
      </Layout>
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
      <Layout>
        <Container maxW="container.xl">
          <Heading mb={8} color="blackBean.700">
            Time Tracking Dashboard
          </Heading>

          {/* Summary Cards */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} mb={8}>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Total Free Time</StatLabel>
                  <StatNumber>
                    {summary?.totalDurationHours.toFixed(1)}
                  </StatNumber>
                  <StatHelpText>{summary?.totalEntries} entries</StatHelpText>
                </Stat>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Categories</StatLabel>
                  <StatNumber>{summary?.projects.length}</StatNumber>
                  <StatHelpText>Active projects</StatHelpText>
                </Stat>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* Charts */}
          <SimpleGrid columns={{ base: 1, lg: 1 }} spacing={6} mb={8}>
            {/* Project Hours Chart */}
            <Card>
              <CardHeader>
                <Heading size="md">Total Hours by Category</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={projectData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-25}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                    />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="hours" fill="#f9cff2" name="Hours" />
                  </BarChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Timeline Chart */}
            <Card>
              <CardHeader>
                <Heading size="md">Free Time Per Month</Heading>
              </CardHeader>
              <CardBody>
                <ResponsiveContainer width="100%" height={400}>
                  <AreaChart data={timelineData}>
                    <defs>
                      <linearGradient
                        id="colorHours"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#f9cff2"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#f9cff2"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                      fontSize={12}
                      tickFormatter={(monthKey) => {
                        const [year, month] = monthKey.split('-');
                        const date = new Date(year, parseInt(month) - 1);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          year: 'numeric',
                        });
                      }}
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(monthKey) => {
                        const [year, month] = monthKey.split('-');
                        const date = new Date(year, parseInt(month) - 1);
                        return date.toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        });
                      }}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke="#607466"
                      fillOpacity={1}
                      fill="url(#colorHours)"
                      name="Hours"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardBody>
            </Card>

            {/* Video Game Hours Chart */}
            {gameData.length > 0 && (
              <Card>
                <CardHeader>
                  <Heading size="md">Hours by Video Game (Top 10)</Heading>
                </CardHeader>
                <CardBody>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={gameData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        type="number"
                        label={{
                          value: 'Hours',
                          position: 'insideBottom',
                          offset: -5,
                        }}
                      />
                      <YAxis
                        type="category"
                        dataKey="name"
                        width={150}
                        fontSize={12}
                      />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="hours" fill="#dae0f2" name="Hours" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardBody>
              </Card>
            )}
          </SimpleGrid>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <Heading size="md">Summary</Heading>
            </CardHeader>
            <CardBody>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box>
                  <Text fontWeight="semibold" mb={2}>
                    Top Categories:
                  </Text>
                  {projectData.slice(0, 5).map((project, index) => (
                    <Text key={index} fontSize="sm" color="gray.600">
                      • {project.name}: {project.hours}h
                    </Text>
                  ))}
                </Box>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Container>
      </Layout>
    </>
  );
};

export default TimeTrackingDashboard;

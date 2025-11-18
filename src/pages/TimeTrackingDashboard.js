import React, { useState, useEffect, useCallback } from 'react';
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
  useBreakpointValue,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from 'recharts';
import {
  getTimeEntries,
  getTimeEntriesSummary,
} from '../lib/supabase/timeEntries';
import MetaTags from '../components/MetaTags';
import ColorSchemeSwitcher, {
  colorSchemes,
} from '../components/ColorSchemeSwitcher';

const TimeTrackingDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [summary, setSummary] = useState(null);
  const [projectData, setProjectData] = useState([]);
  const [timelineData, setTimelineData] = useState([]);
  const [gameData, setGameData] = useState([]);
  const [platformData, setPlatformData] = useState([]);
  const [currentColorScheme, setCurrentColorScheme] = useState('original');
  const toast = useToast();

  // Get current color scheme colors
  const colors = colorSchemes[currentColorScheme];

  // Helper function to convert hours to hh:mm:ss format
  const formatHoursToTime = (hours) => {
    const totalSeconds = Math.round(hours * 3600);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  // Responsive chart heights
  const categoryChartHeight = useBreakpointValue({ base: 250, md: 300 });
  const timelineChartHeight = useBreakpointValue({ base: 300, md: 400 });
  const gameChartHeight = useBreakpointValue({ base: 350, md: 400 });
  const pieChartHeight = useBreakpointValue({ base: 500, md: 450 });

  // Responsive legend settings
  const legendLayout = useBreakpointValue({
    base: 'horizontal',
    md: 'vertical',
  });
  const legendAlign = useBreakpointValue({ base: 'center', md: 'left' });
  const legendVerticalAlign = useBreakpointValue({
    base: 'bottom',
    md: 'middle',
  });
  const legendPaddingLeft = useBreakpointValue({ base: '0px', md: '20px' });
  const legendLineHeight = useBreakpointValue({ base: '24px', md: '50px' });

  // Responsive font sizes
  const xAxisFontSize = useBreakpointValue({ base: 10, md: 12 });
  const yAxisFontSize = useBreakpointValue({ base: 10, md: 12 });
  const smallXAxisFontSize = useBreakpointValue({ base: 9, md: 12 });
  const xAxisHeight = useBreakpointValue({ base: 120, md: 100 });
  const timelineXAxisHeight = useBreakpointValue({ base: 80, md: 100 });
  const gameXAxisHeight = useBreakpointValue({ base: 100, md: 120 });

  const loadData = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch all time entries and summary
      const [entriesData, summaryData] = await Promise.all([
        getTimeEntries(),
        getTimeEntriesSummary(),
      ]);

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
      .sort((a, b) => b.hours - a.hours);

    setGameData(gameChartData);

    // Process platform/tag hours data (for Playing Video Games entries)
    const platformHours = {};
    entriesData
      .filter((entry) => {
        const project = entry.project || '';
        return project === 'Playing Video Games';
      })
      .forEach((entry) => {
        // Tags is an array, get the first tag (based on query results, each entry has exactly one tag)
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
          <Card boxShadow={'2xl'}>
            <CardBody>
              <Stat>
                <StatLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Hobby Time
                </StatLabel>
                <StatNumber fontSize={{ base: '2xl', md: '3xl' }}>
                  {formatHoursToTime(summary?.totalDurationHours || 0)}
                </StatNumber>
                <StatHelpText fontSize={{ base: 'xs', md: 'sm' }}>
                  {summary?.totalEntries} entries
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>

          <Card boxShadow={'2xl'}>
            <CardBody>
              <Stat>
                <StatLabel fontSize={{ base: 'sm', md: 'md' }}>
                  Categories
                </StatLabel>
                <StatNumber fontSize={{ base: '2xl', md: '3xl' }}>
                  {summary?.projects.length}
                </StatNumber>
                <StatHelpText fontSize={{ base: 'xs', md: 'sm' }}>
                  Active projects
                </StatHelpText>
              </Stat>
            </CardBody>
          </Card>
        </SimpleGrid>

        {/* Charts */}
        <SimpleGrid columns={{ base: 1 }} spacing={{ base: 4, md: 6 }} mb={8}>
          {/* Project Hours Chart */}
          <Card boxShadow={'2xl'}>
            <CardHeader>
              <Heading size={{ base: 'sm', md: 'md' }}>
                Total Time by Category
              </Heading>
            </CardHeader>
            <CardBody px={{ base: 0, md: 4 }} overflow="hidden">
              <Box width="100%" overflowX="auto">
                <ResponsiveContainer width="100%" height={categoryChartHeight}>
                  <BarChart
                    data={projectData}
                    margin={{
                      top: 20,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="name"
                      angle={-45}
                      textAnchor="end"
                      height={xAxisHeight}
                      fontSize={xAxisFontSize}
                      interval={0}
                    />
                    <YAxis
                      fontSize={yAxisFontSize}
                      tickFormatter={(value) => formatHoursToTime(value)}
                    />
                    <Tooltip formatter={(value) => formatHoursToTime(value)} />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                    <Bar
                      dataKey="hours"
                      fill={colors.chart1}
                      name="Time"
                      minPointSize={5}
                    >
                      <LabelList
                        dataKey="hours"
                        position="top"
                        fontSize={xAxisFontSize}
                        formatter={(value) => formatHoursToTime(value)}
                      />
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          {/* Timeline Chart */}
          <Card boxShadow={'2xl'}>
            <CardHeader>
              <Heading size={{ base: 'sm', md: 'md' }}>
                Free Time Per Month
              </Heading>
            </CardHeader>
            <CardBody px={{ base: 0, md: 4 }} overflow="hidden">
              <Box width="100%" overflowX="auto">
                <ResponsiveContainer width="100%" height={timelineChartHeight}>
                  <AreaChart
                    data={timelineData}
                    margin={{
                      top: 10,
                      right: 10,
                      left: 0,
                      bottom: 5,
                    }}
                  >
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
                          stopColor={colors.gradient1}
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor={colors.gradient2}
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      angle={-45}
                      textAnchor="end"
                      height={timelineXAxisHeight}
                      fontSize={smallXAxisFontSize}
                      tickFormatter={(monthKey) => {
                        const [year, month] = monthKey.split('-');
                        const date = new Date(year, parseInt(month) - 1);
                        return date.toLocaleDateString('en-US', {
                          month: 'short',
                          year: '2-digit',
                        });
                      }}
                    />
                    <YAxis
                      fontSize={yAxisFontSize}
                      tickFormatter={(value) => formatHoursToTime(value)}
                    />
                    <Tooltip
                      formatter={(value) => formatHoursToTime(value)}
                      labelFormatter={(monthKey) => {
                        const [year, month] = monthKey.split('-');
                        const date = new Date(year, parseInt(month) - 1);
                        return date.toLocaleDateString('en-US', {
                          month: 'long',
                          year: 'numeric',
                        });
                      }}
                    />
                    <Legend wrapperStyle={{ fontSize: '14px' }} />
                    <Area
                      type="monotone"
                      dataKey="hours"
                      stroke={colors.chart3}
                      fillOpacity={1}
                      fill="url(#colorHours)"
                      name="Time"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          {/* Video Game Hours Chart */}
          {gameData.length > 0 && (
            <Card boxShadow={'2xl'}>
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }}>
                  Time by Video Game (Top 10)
                </Heading>
              </CardHeader>
              <CardBody px={{ base: 0, md: 4 }} overflow="hidden">
                <Box width="100%" overflowX="auto">
                  <ResponsiveContainer width="100%" height={gameChartHeight}>
                    <BarChart
                      data={gameData}
                      margin={{
                        top: 10,
                        right: 10,
                        left: 0,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={gameXAxisHeight}
                        fontSize={smallXAxisFontSize}
                        interval={0}
                      />
                      <YAxis
                        fontSize={yAxisFontSize}
                        tickFormatter={(value) => formatHoursToTime(value)}
                        label={{
                          value: 'Time',
                          angle: -90,
                          position: 'insideLeft',
                          style: { fontSize: '12px' },
                        }}
                      />
                      <Tooltip
                        formatter={(value) => formatHoursToTime(value)}
                      />
                      <Legend wrapperStyle={{ fontSize: '14px' }} />
                      <Bar dataKey="hours" name="Time">
                        {gameData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              colors.barColors[index % colors.barColors.length]
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>
          )}
        </SimpleGrid>

        {/* Additional Info */}
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
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={{ base: 4, md: 6 }}>
            <TableContainer overflowX="auto">
              <Table variant="striped" size={{ base: 'sm', md: 'md' }}>
                <Thead bg="blackBean.700">
                  <Tr>
                    <Th color="white">Game</Th>
                    <Th isNumeric color="white">
                      Time
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gameData
                    .slice(0, Math.ceil(gameData.length / 2))
                    .map((game, index) => (
                      <Tr key={index}>
                        <Td fontSize={{ base: 'xs', md: 'sm' }}>{game.name}</Td>
                        <Td isNumeric fontSize={{ base: 'xs', md: 'sm' }}>
                          {formatHoursToTime(game.hours)}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
            <TableContainer overflowX="auto">
              <Table variant="striped" size={{ base: 'sm', md: 'md' }}>
                <Thead
                  bg="blackBean.700"
                  display={{ base: 'none', md: 'table-header-group' }}
                >
                  <Tr>
                    <Th color="white">Game</Th>
                    <Th isNumeric color="white">
                      Time
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {gameData
                    .slice(Math.ceil(gameData.length / 2))
                    .map((game, index) => (
                      <Tr key={index}>
                        <Td fontSize={{ base: 'xs', md: 'sm' }}>{game.name}</Td>
                        <Td isNumeric fontSize={{ base: 'xs', md: 'sm' }}>
                          {formatHoursToTime(game.hours)}
                        </Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
            </TableContainer>
          </SimpleGrid>
        )}

        {/* Platform Pie Chart */}
        {platformData.length > 0 && (
          <Box width={{ base: '100%', md: '50%' }} mx="auto">
            <Card my={5} boxShadow={'2xl'}>
              <CardHeader>
                <Heading size={{ base: 'sm', md: 'md' }} align="center">
                  Time by Platform
                </Heading>
              </CardHeader>
              <CardBody px={{ base: 2, md: 4 }}>
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="center"
                  sx={{
                    '& .recharts-legend-item-text': {
                      color: 'black !important',
                    },
                  }}
                >
                  <ResponsiveContainer width="100%" height={pieChartHeight}>
                    <PieChart>
                      <Pie
                        data={platformData}
                        dataKey="hours"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius="60%"
                        outerRadius="90%"
                        cornerRadius="50%"
                        paddingAngle={5}
                        label={false}
                      >
                        {platformData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={
                              colors.barColors[index % colors.barColors.length]
                            }
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value, name, props) => [
                          formatHoursToTime(value),
                          props.payload.name,
                        ]}
                      />
                      <Legend
                        layout={legendLayout}
                        align={legendAlign}
                        verticalAlign={legendVerticalAlign}
                        formatter={(value, entry) =>
                          `${value}: ${formatHoursToTime(entry.payload.hours)}`
                        }
                        wrapperStyle={{
                          fontSize: '14px',
                          color: '#000000',
                          paddingLeft: legendPaddingLeft,
                          lineHeight: legendLineHeight,
                        }}
                        contentStyle={{ color: '#000000' }}
                        iconType="circle"
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardBody>
            </Card>
          </Box>
        )}
      </Container>

      {/* Color Scheme Switcher */}
      <ColorSchemeSwitcher
        currentScheme={currentColorScheme}
        onSchemeChange={setCurrentColorScheme}
      />
    </>
  );
};

export default TimeTrackingDashboard;

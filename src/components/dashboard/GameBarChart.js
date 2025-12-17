import React, { useState } from 'react';
import { useBreakpointValue, Box, ButtonGroup, Button } from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatHoursToTime } from '../../utils/timeFormatting';

const GameBarChart = ({ data, barColors }) => {
  const [topCount, setTopCount] = useState(10);
  const gameChartHeight = useBreakpointValue({ base: 350, md: 400 });
  const yAxisFontSize = useBreakpointValue({ base: 10, md: 12 });
  const smallXAxisFontSize = useBreakpointValue({ base: 9, md: 12 });
  const gameXAxisHeight = useBreakpointValue({ base: 100, md: 120 });

  // Slice data based on selected top count
  const displayData = data.slice(0, topCount);

  return (
    <Box>
      {/* Toggle buttons */}
      <Box display="flex" justifyContent="center" mb={4}>
        <ButtonGroup
          size={{ base: 'sm', md: 'md' }}
          isAttached
          variant="outline"
        >
          <Button
            colorScheme={topCount === 10 ? 'blue' : 'gray'}
            onClick={() => setTopCount(10)}
            isActive={topCount === 10}
          >
            Top 10
          </Button>
          <Button
            colorScheme={topCount === 20 ? 'blue' : 'gray'}
            onClick={() => setTopCount(20)}
            isActive={topCount === 20}
          >
            Top 20
          </Button>
          <Button
            colorScheme={topCount === 30 ? 'blue' : 'gray'}
            onClick={() => setTopCount(30)}
            isActive={topCount === 30}
          >
            Top 30
          </Button>
        </ButtonGroup>
      </Box>

      <ResponsiveContainer width="100%" height={gameChartHeight}>
        <BarChart
          data={displayData}
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
            tickFormatter={(value) => `${Math.round(value)}h`}
            label={{
              value: 'Hours',
              angle: -90,
              position: 'insideLeft',
              style: { fontSize: '12px' },
            }}
          />
          <Tooltip formatter={(value) => formatHoursToTime(value)} />
          <Bar dataKey="hours" name="Time">
            {displayData.map((_entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColors[index % barColors.length]}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default GameBarChart;

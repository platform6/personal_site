import React from 'react';
import { useBreakpointValue } from '@chakra-ui/react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { formatHoursToTime } from '../../utils/timeFormatting';

const TimelineAreaChart = ({
  data,
  gradientColor1,
  gradientColor2,
  lineColor,
}) => {
  const timelineChartHeight = useBreakpointValue({ base: 300, md: 400 });
  const yAxisFontSize = useBreakpointValue({ base: 10, md: 12 });
  const smallXAxisFontSize = useBreakpointValue({ base: 9, md: 12 });
  const timelineXAxisHeight = useBreakpointValue({ base: 80, md: 100 });

  return (
    <ResponsiveContainer width="100%" height={timelineChartHeight}>
      <AreaChart
        data={data}
        margin={{
          top: 10,
          right: 10,
          left: 0,
          bottom: 5,
        }}
      >
        <defs>
          <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={gradientColor1} stopOpacity={0.8} />
            <stop offset="95%" stopColor={gradientColor2} stopOpacity={0.1} />
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
          stroke={lineColor}
          fillOpacity={1}
          fill="url(#colorHours)"
          name="Time"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default TimelineAreaChart;

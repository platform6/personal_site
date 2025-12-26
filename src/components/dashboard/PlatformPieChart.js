import React from 'react';
import { useBreakpointValue, Box } from '@chakra-ui/react';
import {
  PieChart,
  Pie,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { formatHoursToTime } from '../../utils/timeFormatting';

const PlatformPieChart = ({ data, barColors }) => {
  const pieChartHeight = useBreakpointValue({ base: 500, md: 450 });
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

  return (
    <Box
      width="100%"
      display="flex"
      justifyContent="center"
      sx={{
        '& .recharts-legend-item-text': {
          color: 'text.primary !important',
        },
      }}
    >
      <ResponsiveContainer width="100%" height={pieChartHeight}>
        <PieChart>
          <Pie
            data={data}
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
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={barColors[index % barColors.length]}
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
            itemSorter={(entry) => -entry.payload.hours}
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
  );
};

export default PlatformPieChart;

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

/**
 * Helper function to sort data in descending order by hours
 * @param {Array} data - Array of objects with hours property
 * @returns {Array} Sorted array in descending order by hours
 */
const sortDataDescending = (data) => {
  return [...data].sort((a, b) => b.hours - a.hours);
};

const CategoryBarChart = ({ data, barColors }) => {
  // Sort data in descending order for the legend
  const sortedData = sortDataDescending(data);

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

  // Create a color map for consistent color assignment
  const colorMap = {};
  sortedData.forEach((item, index) => {
    colorMap[item.name] = barColors[index % barColors.length];
  });

  // Create custom legend payload sorted by hours in descending order
  const legendPayload = sortedData.map((item) => ({
    value: item.name,
    type: 'circle',
    id: item.name,
    color: colorMap[item.name],
    payload: item,
  }));

  // Debug: Log the sorted data to verify order
  console.log(
    'CategoryBarChart - sortedData:',
    sortedData.map((d) => ({ name: d.name, hours: d.hours }))
  );
  console.log(
    'CategoryBarChart - legendPayload:',
    legendPayload.map((d) => ({ name: d.value, hours: d.payload.hours }))
  );

  return (
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
            data={sortedData}
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
            {sortedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colorMap[entry.name]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, _name, props) => [
              formatHoursToTime(value),
              props.payload.name,
            ]}
          />
          {
            <Legend
              payload={legendPayload}
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
          }
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default CategoryBarChart;

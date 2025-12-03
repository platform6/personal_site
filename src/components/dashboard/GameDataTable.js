import React from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { formatHoursToTime } from '../../utils/timeFormatting';

const GameDataTable = ({ data, showHeader = true }) => {
  return (
    <TableContainer overflowX="auto">
      <Table
        variant="striped"
        border={'1px dotted grey'}
        size={{ base: 'sm', md: 'md' }}
      >
        <Thead
          bg="blackBean.700"
          display={
            showHeader
              ? 'table-header-group'
              : { base: 'none', md: 'table-header-group' }
          }
        >
          <Tr>
            <Th color="white">Game</Th>
            <Th color="white" textAlign={'right'}>
              Time
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {data.map((game, index) => (
            <Tr key={index}>
              <Td
                fontSize={{ base: 'xs', md: 'sm' }}
                py={{ base: 1, md: 3 }}
                px={{ base: 2, md: 4 }}
              >
                {game.name}
              </Td>
              <Td
                isNumeric
                fontSize={{ base: 'xs', md: 'sm' }}
                py={{ base: 1, md: 3 }}
                px={{ base: 2, md: 4 }}
              >
                {formatHoursToTime(game.hours)}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default GameDataTable;

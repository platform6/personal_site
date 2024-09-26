import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

const Battle = () => {
  return (
    <Flex
      direction="column"
      justify="space-between"
      align="center"
      height="50vh"
      border={'3px solid tomato'}
    >
      {/* Middle square for the main battle */}
      <Box
        bg="gray.300"
        width="100px"
        height="100px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        borderRadius="md"
      >
        {/* Content for battle */}
        Unemployment
      </Box>

      {/* Bottom row for Player squares */}
      <Flex justify="center" mt="auto" mb={4}>
        <Box
          bg="blue.300"
          width="100px"
          height="100px"
          m={2}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Player 1
        </Box>
        <Box
          bg="blue.300"
          width="100px"
          height="100px"
          m={2}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Player 2
        </Box>
        <Box
          bg="blue.300"
          width="100px"
          height="100px"
          m={2}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Player 3
        </Box>
        <Box
          bg="blue.300"
          width="100px"
          height="100px"
          m={2}
          borderRadius="md"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          Player 4
        </Box>
      </Flex>
    </Flex>
  );
};

export default Battle;

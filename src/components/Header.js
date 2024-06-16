// src/components/Header.js
import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';

const Header = () => (
  <Box bg="teal.500" p={4}>
    <Flex justify="space-between" align="center">
      <Heading as="h1" size="lg" color="white">
        My Portfolio
      </Heading>
    </Flex>
  </Box>
);

export default Header;

// src/components/Header.js
import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => (
  <Box bg="teal.500" p={4}>
    <Flex justify="space-between" align="center">
      <Link to="/">
        <Heading as="h1" size="lg" color="white">
          Garrett Conn
        </Heading>
      </Link>
    </Flex>
  </Box>
);

export default Header;

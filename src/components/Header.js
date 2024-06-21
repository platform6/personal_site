// src/components/Header.js
import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => (
  <Box bg="#9f65b8" p={4} py={{ base: 12, md: 4 }}>
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

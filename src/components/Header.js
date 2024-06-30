// src/components/Header.js
import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const Header = () => (
  <Box bg="#9f037a" p={4} py={{ base: 6, md: 4 }}>
    <Flex justify="space-between" align="center">
      <Link to="/">
        <Heading pl={'8px'} as="h1" size="lg" color="white">
          Garrett Conn
        </Heading>
      </Link>
    </Flex>
  </Box>
);

export default Header;

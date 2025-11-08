// src/components/Layout.js
import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const Layout = ({ children, bg = 'transparent' }) => (
  <Box bg={bg} minH="100vh">
    <Container maxW="container.xl" px={{ base: 0, md: 4 }}>
      <Box py={{ base: 4, md: 10 }}>{children}</Box>
    </Container>
  </Box>
);

export default Layout;

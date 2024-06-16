// src/components/Layout.js
import React from 'react';
import { Box, Container } from '@chakra-ui/react';

const Layout = ({ children }) => (
  <Container maxW="container.xl">
    <Box my={4}>{children}</Box>
  </Container>
);

export default Layout;

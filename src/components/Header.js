// src/components/Header.js
import { Box, Flex, Heading } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import ColorModeToggle from './ColorModeToggle';

const Header = () => (
  <Box bg="brand.primary" p={4} py={{ base: 6, md: 4 }}>
    <Flex justify="space-between" align="center">
      <Link to="/">
        <Heading pl={'8px'} as="h1" size="lg" color="white">
          Garrett Conn
        </Heading>
      </Link>
      <ColorModeToggle />
    </Flex>
  </Box>
);

export default Header;

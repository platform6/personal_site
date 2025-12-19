import React from 'react';
import { Box, Heading } from '@chakra-ui/react';

const AnimatedHeader = ({ data }) => {
  return (
    <Box
      mb={6}
      width="100%"
      bg="brand.primary"
      overflow="hidden"
      position="relative"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: '-100%',
        width: '100%',
        height: '100%',
        background:
          'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
        animation: 'shimmer 2s ease-in-out 0.5s',
      }}
      sx={{
        '@keyframes shimmer': {
          '0%': {
            left: '-100%',
          },
          '100%': {
            left: '100%',
          },
        },
        '@keyframes slideIn': {
          '0%': {
            opacity: 0,
            transform: 'translateX(20px)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateX(0)',
          },
        },
      }}
    >
      <Heading
        size="sm"
        color="white"
        p={5}
        opacity={0}
        animation="slideIn 0.8s ease-out 0.3s forwards"
      >
        {data}
      </Heading>
    </Box>
  );
};

export default AnimatedHeader;

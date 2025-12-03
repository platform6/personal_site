import React from 'react';
import { Card, CardHeader, CardBody, Heading, Box } from '@chakra-ui/react';

const ChartCard = ({ title, children }) => {
  return (
    <Card boxShadow={'2xl'}>
      <CardHeader>
        <Heading size={{ base: 'sm', md: 'md' }}>{title}</Heading>
      </CardHeader>
      <CardBody px={{ base: 0, md: 4 }} overflow="hidden">
        <Box width="100%" overflowX="auto">
          {children}
        </Box>
      </CardBody>
    </Card>
  );
};

export default ChartCard;

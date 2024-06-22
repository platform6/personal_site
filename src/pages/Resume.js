import React from 'react';
//import resumeItems from '../components/Resume/ResumeItems';
import { Box, Text } from '@chakra-ui/react';

const Resume = () => {
  // const TimelineItem = ({ year, title, description, position }) => (
  //   <VStack align="start" p={6} spacing={4}>
  //     <Text fontWeight="bold" fontSize="lg">
  //       {year}
  //     </Text>
  //     <Text fontSize="md">{title}</Text>
  //     <Text fontSize="sm" color="gray.600">
  //       {description}
  //     </Text>
  //   </VStack>
  // );

  // return resumeItems.map((item, index) => (
  //   <TimelineItem
  //     key={index}
  //     year={item.year}
  //     title={item.title}
  //     description={item.description}
  //   />
  // ));
  return (
    <Box p={50} align={'center'}>
      <Text align={'center'} justifyContent={'center'}>
        in progress ...{' '}
      </Text>
    </Box>
  );
};

export default Resume;

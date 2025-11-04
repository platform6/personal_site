import React from 'react';
import { Box, Text, SimpleGrid, Flex } from '@chakra-ui/react';
import { faReact, faNodeJs, faJava } from '@fortawesome/free-brands-svg-icons';
import { faCube, faCloud, faRobot } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Expertise = () => {
  const exp = [
    { name: 'React', icon: faReact },
    { name: 'Chakra UI', icon: faCube }, // No specific icon for Chakra UI, using a generic icon
    { name: 'AWS', icon: faCloud }, // No specific icon for AWS, using a cloud icon
    { name: 'NodeJS', icon: faNodeJs },
    { name: 'UiPath', icon: faRobot }, // No specific icon for UiPath, using a robot icon
    { name: 'Java', icon: faJava },
  ];

  const boxes = exp.map((x, index) => {
    return (
      <Flex
        background={'white'}
        borderRadius={'md'}
        key={index}
        flexDirection={'column'}
        justifyContent="space-between"
        pt={5}
        boxShadow="lg"
      >
        <FontAwesomeIcon icon={x.icon} size="2x" />
        <Text my={5} fontSize={'sm'}>
          {x.name}
        </Text>
      </Flex>
    );
  });

  const grid = (
    <SimpleGrid columns={3} spacing={5}>
      {boxes}
    </SimpleGrid>
  );

  return (
    <Box bg={'#F4C3E9'} p={{ base: 2, md: 6 }} align={'center'} pb={8} px={5}>
      <Text mb={3}>
        KEY AREAS OF{' '}
        <span style={{ color: 'brand.primary', fontWeight: '600' }}>
          EXPERTISE
        </span>
      </Text>
      {grid}
    </Box>
  );
};

export default Expertise;

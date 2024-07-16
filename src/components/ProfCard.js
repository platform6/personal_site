import React from 'react';
import { Box, Text, Flex } from '@chakra-ui/react';
import { Card, CardHeader, Heading, CardBody, List } from '@chakra-ui/react';
import ListResp from './ListResp';

const ProfCard = ({
  id,
  employer,
  title,
  location,
  date,
  responsibilities,
  technologies_used = [],
}) => {
  // console.log(technologies_used);
  // const techTags = technologies_used.map((tech) => {
  //   return <Box>{tech}</Box>;
  // });
  return (
    // <Box border={'3px dotted purple'} bg={'#F4C3E9'}>
    <Box mt={10}>
      <Card key={id} boxShadow="2xl">
        <CardHeader>
          <Flex spacing="5">
            <Flex flex="1" gap="4" alignItems="center" flexWrap="wrap">
              <Box>
                <Heading size="sm">{title}</Heading>
                <Text>{employer}</Text>
                <Text fontSize={'sm'}>{date}</Text>
              </Box>
            </Flex>
          </Flex>
        </CardHeader>
        <CardBody>
          <List spacing={5}>
            <ListResp data={responsibilities} />
          </List>
        </CardBody>
      </Card>
    </Box>
    // </Box>
  );
};

export default ProfCard;

import React from 'react';
import { Box, Text, Flex, Wrap, WrapItem, Tag } from '@chakra-ui/react';
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
  return (
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
          {/* tags */}
          {technologies_used.length > 0 && (
            <Box mt={4}>
              <Text fontSize="sm" fontWeight="semibold" mb={2}>
                Technologies:
              </Text>
              <Wrap spacing={2}>
                {technologies_used.map((tech, index) => (
                  <WrapItem key={index}>
                    <Tag size="md" bg="lavenderWeb.400" color="blackBean.800">
                      {tech}
                    </Tag>
                  </WrapItem>
                ))}
              </Wrap>
            </Box>
          )}
        </CardBody>
      </Card>
    </Box>
    // </Box>
  );
};

export default ProfCard;

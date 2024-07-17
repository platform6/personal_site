import {
  Card,
  CardBody,
  Heading,
  Text,
  Image,
  VStack,
  Box,
} from '@chakra-ui/react';

const ResultCard = ({ data }) => {
  return (
    <Card maxW="sm" my="5px" shadow="lg">
      <CardBody>
        <VStack align="center" spacing="3">
          <Heading>{data.name}</Heading>
          <Image
            borderRadius="full"
            boxSize="150px"
            src={data.image}
            alt={data.name}
          />
          <Box maxW="400px">
            <Text fontSize="lg" justify="center">
              {data.description}
            </Text>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ResultCard;

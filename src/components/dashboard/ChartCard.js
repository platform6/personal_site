import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';

const ChartCard = ({ title, children }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card boxShadow="dark-lg" bg={cardBg}>
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

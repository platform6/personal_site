import {
  Card,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  useColorModeValue,
} from '@chakra-ui/react';

const SummaryCard = ({ stats }) => {
  const cardBg = useColorModeValue('white', 'gray.800');

  return (
    <Card boxShadow="dark-lg" bg={cardBg}>
      <CardBody>
        {stats.map((stat, index) => (
          <Stat key={index} mb={index < stats.length - 1 ? 4 : 0}>
            <StatLabel fontSize={{ base: 'sm', md: 'md' }}>
              {stat.label}
            </StatLabel>
            <StatNumber fontSize={{ base: '2xl', md: '3xl' }}>
              {stat.value}
            </StatNumber>
            <StatHelpText fontSize={{ base: 'xs', md: 'sm' }}>
              {stat.helpText}
            </StatHelpText>
          </Stat>
        ))}
      </CardBody>
    </Card>
  );
};

export default SummaryCard;

import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  VStack,
  Flex,
  Text,
  Box,
  useColorModeValue,
} from '@chakra-ui/react';
import { formatHoursToStructured } from '../../utils/timeFormatting';

const LongestSessionCard = ({ longestSessions }) => {
  const cardBg = useColorModeValue('white', 'gray.800');
  const labelColor = useColorModeValue('gray.600', 'gray.400');
  const accentColor = useColorModeValue('brand.primary', 'brand.secondary');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (hours) => {
    const time = formatHoursToStructured(hours);
    const parts = [];

    if (time.hasHours) {
      parts.push(`${time.hours}h`);
    }
    parts.push(`${time.minutes}m`);

    return parts.join(' ');
  };

  const SessionRow = ({ label, sessionData }) => {
    if (!sessionData) return null;

    return (
      <Box>
        <Text fontSize="xs" color={labelColor} mb={1}>
          {label}
        </Text>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align={{ base: 'flex-start', md: 'center' }}
          gap={{ base: 1, md: 2 }}
        >
          <Text
            fontWeight="bold"
            fontSize={{ base: 'sm', md: 'md' }}
            color={accentColor}
            flex="1"
          >
            {sessionData.name}
          </Text>
          <Flex gap={2} align="center">
            <Text fontSize={{ base: 'sm', md: 'md' }} fontWeight="semibold">
              {formatTime(sessionData.hours)}
            </Text>
            {sessionData.date && (
              <Text fontSize="xs" color={labelColor}>
                {formatDate(sessionData.date)}
              </Text>
            )}
          </Flex>
        </Flex>
      </Box>
    );
  };

  return (
    <Card boxShadow="dark-lg" bg={cardBg}>
      <CardHeader>
        <Heading size={{ base: 'sm', md: 'md' }} align="center">
          Longest Single Sessions
        </Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <SessionRow
            label="Longest Gaming Session"
            sessionData={longestSessions?.gaming}
          />
          <SessionRow
            label="Longest Game Dev Session"
            sessionData={longestSessions?.gameDev}
          />
          <SessionRow
            label="Most Productive Day"
            sessionData={longestSessions?.mostProductiveDay}
          />
        </VStack>
      </CardBody>
    </Card>
  );
};

export default LongestSessionCard;

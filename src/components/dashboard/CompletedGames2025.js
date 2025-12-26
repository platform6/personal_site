import { useState, useMemo } from 'react';
import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Image,
  useColorModeValue,
  Spinner,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import useMarkdownContent from '../../hooks/useMarkdownContent';
import { parseGameSection } from '../../utils/markdownParser';

const CompletedGames2025 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const cardsPerView = 3; // Number of cards visible at once
  const cardWidth = 350;
  const gapWidth = 16;
  const scrollOffset = cardWidth + gapWidth; // 366px

  // Load markdown content
  const { content, loading } = useMarkdownContent(
    '/data/completed_games_2025.md'
  );

  // Parse markdown into game objects
  const gamesData = useMemo(() => {
    if (!content) return [];

    const sections = content
      .split('---')
      .map((s) => s.trim())
      .filter((s) => s);

    const games = sections
      .map((section) => parseGameSection(section))
      .filter((game) => game !== null);

    return games;
  }, [content]);

  // Color mode values
  const cardBg = useColorModeValue('white', 'gray.800');
  const subtleBg = useColorModeValue('gray.50', 'gray.700');
  const textSecondary = useColorModeValue('gray.600', 'gray.400');
  const textTertiary = useColorModeValue('gray.500', 'gray.500');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const imagePlaceholderBg = useColorModeValue('gray.200', 'gray.600');
  const overlayBg = useColorModeValue(
    'rgba(255, 255, 255, 0.3)',
    'rgba(0, 0, 0, 0.3)'
  );
  const overlayHoverBg = useColorModeValue(
    'rgba(255, 255, 255, 0.6)',
    'rgba(0, 0, 0, 0.6)'
  );
  const iconColor = useColorModeValue('gray.700', 'gray.300');

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(gamesData.length - cardsPerView, prev + 1)
    );
  };

  const selectedGame = gamesData[selectedGameIndex];

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minH="400px"
      >
        <Spinner size="xl" color="brand.primary" thickness="4px" />
      </Box>
    );
  }

  if (!gamesData.length) {
    return null;
  }

  return (
    <Box py={8} px={{ base: 4, md: 0 }}>
      <VStack spacing={8} align="stretch">
        <Heading size="2xl" textAlign="center">
          Things I Did This Year
        </Heading>

        <Text textAlign="center" fontSize="lg" color={textSecondary}>
          {gamesData.length} games completed!
        </Text>

        {/* Carousel Container */}
        <Box position="relative" py={8} display="flex" justifyContent="center">
          {/* Game Cards Container */}
          <Box overflow="hidden" width="1082px" maxW="100%" position="relative">
            <Flex
              gap={4}
              transition="transform 0.5s ease-in-out"
              transform={`translateX(-${currentIndex * scrollOffset}px)`}
            >
              {gamesData.map((game, index) => (
                <Box
                  key={index}
                  borderRadius="lg"
                  overflow="hidden"
                  w="350px"
                  flex="0 0 350px"
                  boxShadow={selectedGameIndex === index ? '2xl' : 'xl'}
                  bg={cardBg}
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => setSelectedGameIndex(index)}
                  borderColor={
                    selectedGameIndex === index ? 'brand.primary' : borderColor
                  }
                  borderWidth={selectedGameIndex === index ? '3px' : '1px'}
                  _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                >
                  {/* Image Placeholder */}
                  <Box
                    bg={imagePlaceholderBg}
                    h="250px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Image
                      src={`/images/games/${game.name.replace(/[^a-zA-Z0-9]/g, '_')}.jpg`}
                      alt={game.name}
                      objectFit="cover"
                      w="100%"
                      h="100%"
                      fallback={
                        <Text fontSize="6xl" color="gray.400">
                          🎮
                        </Text>
                      }
                    />
                  </Box>

                  {/* Card Content */}
                  <VStack p={4} spacing={3} align="stretch">
                    {/* Game Title */}
                    <Heading size="md" textAlign="center" minH="60px">
                      {game.name}
                    </Heading>

                    {/* Completed Date */}
                    {game.completedDate && (
                      <Text
                        textAlign="center"
                        color={textTertiary}
                        fontSize="sm"
                      >
                        Completed: {game.completedDate}
                      </Text>
                    )}
                  </VStack>
                </Box>
              ))}
            </Flex>

            {/* Previous Button - Overlaid */}
            <Box
              as="button"
              onClick={handlePrevious}
              aria-label="Previous games"
              position="absolute"
              left="0"
              top="0"
              height="100%"
              width="20px"
              zIndex={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={overlayBg}
              opacity={currentIndex === 0 ? 0 : 1}
              transition="all 0.3s"
              cursor={currentIndex === 0 ? 'not-allowed' : 'pointer'}
              pointerEvents={currentIndex === 0 ? 'none' : 'auto'}
              _hover={{
                bg: overlayHoverBg,
              }}
            >
              <ChevronLeftIcon boxSize={12} color={iconColor} />
            </Box>

            {/* Next Button - Overlaid */}
            <Box
              as="button"
              onClick={handleNext}
              aria-label="Next games"
              position="absolute"
              right="0"
              top="0"
              height="100%"
              width="20px"
              zIndex={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
              bg={overlayBg}
              opacity={currentIndex >= gamesData.length - cardsPerView ? 0 : 1}
              transition="all 0.3s"
              cursor={
                currentIndex >= gamesData.length - cardsPerView
                  ? 'not-allowed'
                  : 'pointer'
              }
              pointerEvents={
                currentIndex >= gamesData.length - cardsPerView
                  ? 'none'
                  : 'auto'
              }
              _hover={{
                bg: overlayHoverBg,
              }}
            >
              <ChevronRightIcon boxSize={12} color={iconColor} />
            </Box>
          </Box>
        </Box>

        {/* Progress Indicator */}
        <HStack justify="center" spacing={2}>
          {Array.from({
            length: Math.ceil(gamesData.length / cardsPerView),
          }).map((_, index) => (
            <Box
              key={index}
              w={currentIndex === index ? '12px' : '8px'}
              h={currentIndex === index ? '12px' : '8px'}
              borderRadius="full"
              bg={currentIndex === index ? 'brand.primary' : 'gray.300'}
              transition="all 0.3s"
              cursor="pointer"
              onClick={() =>
                setCurrentIndex(
                  Math.min(index, gamesData.length - cardsPerView)
                )
              }
              _hover={{
                bg: currentIndex === index ? 'brand.primary' : 'gray.400',
              }}
            />
          ))}
        </HStack>

        {/* Write-up Section - Below Carousel */}
        <Box
          p={6}
          bg={cardBg}
          borderRadius="lg"
          borderWidth="1px"
          borderColor="brand.primary"
          boxShadow="lg"
          minH="200px"
        >
          <VStack spacing={4} align="stretch">
            <Heading size="lg" textAlign="center">
              {selectedGame.name}
            </Heading>

            {selectedGame.completedDate && (
              <Text textAlign="center" color={textTertiary} fontSize="md">
                Completed: {selectedGame.completedDate}
              </Text>
            )}

            <Box
              p={4}
              bg={subtleBg}
              borderRadius="md"
              borderWidth="1px"
              borderColor={borderColor}
            >
              {selectedGame.paragraphs?.map((paragraph, idx) => (
                <Text
                  key={idx}
                  lineHeight="tall"
                  fontSize="md"
                  mb={idx < selectedGame.paragraphs.length - 1 ? 4 : 0}
                >
                  {paragraph}
                </Text>
              ))}
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default CompletedGames2025;

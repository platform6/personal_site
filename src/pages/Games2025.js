import { useState } from 'react';
import {
  Container,
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  HStack,
  Image,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import gamesData from '../data/2025_comp_games.json';

const Games2025 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGameIndex, setSelectedGameIndex] = useState(0);
  const cardsPerView = 4; // Number of cards visible at once
  const cardWidth = 350;
  const gapWidth = 16;
  const scrollOffset = cardWidth + gapWidth; // 366px

  const handlePrevious = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      Math.min(gamesData.length - cardsPerView, prev + 1)
    );
  };

  const selectedGame = gamesData[selectedGameIndex];

  return (
    <Container maxW="80%" py={8}>
      <VStack spacing={8} align="stretch">
        <Heading size="2xl" textAlign="center">
          Completed Games 2025
        </Heading>

        <Text textAlign="center" fontSize="lg" color="gray.600">
          Woho! We did it {gamesData.length} completed!
        </Text>
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

        {/* Carousel Container */}
        <Box position="relative" py={8} display="flex" justifyContent="center">
          {/* Game Cards Container */}
          <Box overflow="hidden" width="1448px" maxW="100%" position="relative">
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
                  bg="white"
                  transition="all 0.3s"
                  cursor="pointer"
                  onClick={() => setSelectedGameIndex(index)}
                  borderColor={
                    selectedGameIndex === index ? 'brand.primary' : 'gray.200'
                  }
                  borderWidth={selectedGameIndex === index ? '3px' : '1px'}
                  _hover={{ transform: 'translateY(-4px)', boxShadow: '2xl' }}
                >
                  {/* Image Placeholder */}
                  <Box
                    bg="gray.200"
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
                      <Text textAlign="center" color="gray.500" fontSize="sm">
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
              bg="rgba(255, 255, 255, 0.3)"
              opacity={currentIndex === 0 ? 0 : 1}
              transition="all 0.3s"
              cursor={currentIndex === 0 ? 'not-allowed' : 'pointer'}
              pointerEvents={currentIndex === 0 ? 'none' : 'auto'}
              _hover={{
                bg: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <ChevronLeftIcon boxSize={12} color="gray.700" />
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
              bg="rgba(255, 255, 255, 0.3)"
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
                bg: 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <ChevronRightIcon boxSize={12} color="gray.700" />
            </Box>
          </Box>
        </Box>

        {/* Write-up Section - Below Carousel */}
        <Box
          p={6}
          bg="white"
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
              <Text textAlign="center" color="gray.500" fontSize="md">
                Completed: {selectedGame.completedDate}
              </Text>
            )}

            <Box
              p={4}
              bg="gray.50"
              borderRadius="md"
              borderWidth="1px"
              borderColor="gray.200"
            >
              <Text color="gray.700" lineHeight="tall" fontSize="md">
                {selectedGame.writeup || 'Write-up coming soon...'}
              </Text>
            </Box>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
};

export default Games2025;

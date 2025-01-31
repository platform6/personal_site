import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  VStack,
  Heading,
  Text,
  Flex,
  useColorModeValue,
  IconButton,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const fetchSheetData = async (sheetName = 'GameList') => {
  const response = await fetch(
    `/.netlify/functions/googleSheetsProxy?sheet=${sheetName}`
  ); // Netlify serverless function
  const data = await response.json();
  return data;
};

const GameList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [games, setGames] = useState([]);
  const [error, setError] = useState(null);
  const [activeSheet, setActiveSheet] = useState('GameList');

  useEffect(() => {
    const loadGames = async () => {
      try {
        setLoading(true);
        const data = await fetchSheetData(activeSheet);
        setGames(data);
      } catch (err) {
        setError('Failed to load games');
        console.error('Error loading games:', err);
      } finally {
        setLoading(false);
      }
    };
    loadGames();
  }, [activeSheet]);

  const ITEMS_PER_PAGE = 20;

  const pageCount = Math.ceil(games.length / ITEMS_PER_PAGE);
  const currentItems = games.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSheetChange = (sheetName) => {
    setActiveSheet(sheetName);
    setCurrentPage(1); // Reset to first page when changing sheets
  };
  return (
    <Container maxW="4xl" py={8}>
      <ButtonGroup spacing={4} mb={6} width="100%" justifyContent="center">
        <Button
          color={'white'}
          bg={activeSheet === 'GameList' ? '#9f037a' : 'gray'}
          onClick={() => handleSheetChange('GameList')}
        >
          Game List (Personal)
        </Button>
        <Button
          color={'white'}
          bg={activeSheet === 'GameListInf' ? '#9f037a' : 'lightGray'}
          onClick={() => handleSheetChange('GameListInf')}
        >
          Game List (Most Influential)
        </Button>
      </ButtonGroup>
      <VStack spacing={4} align="stretch" mb={6} mt={6}>
        {currentItems.map((game) => (
          <Flex
            key={game[0]}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            _hover={{ shadow: 'md' }}
            transition="all 0.2s"
          >
            <Heading size="md" m={4} alignContent={'center'}>
              {game[0]}.
            </Heading>
            <Text color="gray.600" alignContent={'center'}>
              {game[1]}
            </Text>
          </Flex>
        ))}
      </VStack>

      {pageCount > 1 && (
        <Flex justify="space-between" align="center">
          <IconButton
            icon={<ChevronLeftIcon />}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            isDisabled={currentPage === 1}
            aria-label="Previous page"
          />

          <Text fontSize="sm">
            Page {currentPage} of {pageCount}
          </Text>

          <IconButton
            icon={<ChevronRightIcon />}
            onClick={() => setCurrentPage((p) => Math.min(pageCount, p + 1))}
            isDisabled={currentPage === pageCount}
            aria-label="Next page"
          />
        </Flex>
      )}
    </Container>
  );
};

export default GameList;

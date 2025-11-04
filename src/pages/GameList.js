import React, { useState, useEffect } from 'react';
import {
  Container,
  VStack,
  Heading,
  Text,
  Flex,
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
  const [games, setGames] = useState([]);
  const [activeSheet, setActiveSheet] = useState('GameList');

  useEffect(() => {
    const loadGames = async () => {
      try {
        const data = await fetchSheetData(activeSheet);
        setGames(data);
      } catch (err) {
        console.error('Error loading games:', err);
      } finally {
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
      <Text p={6}>
        This code represents a full-stack implementation of a game list viewer
        using React and a Netlify serverless function to fetch data from Google
        Sheets. The backend component (exports.handler) is a Netlify serverless
        function that securely manages the connection to Google Sheets. It uses
        environment variables to store sensitive API credentials and accepts a
        sheet name parameter through query parameters, allowing dynamic
        selection of different game lists. The frontend component (GameList) is
        a React component that presents the data in a paginated, interactive
        interface. It features a toggle system between two different game lists
        ("Personal" and "Most Influential") using styled buttons, and displays
        games in a responsive layout with 20 items per page. The component
        implements pagination controls for navigating through the list and uses
        Chakra UI for consistent styling. The two parts communicate through the
        fetchSheetData function, which makes API calls to the Netlify function
        endpoint, passing the selected sheet name and receiving the
        corresponding game data. This architecture ensures secure API key
        handling while providing a smooth, responsive user experience for
        viewing and navigating between different game lists.
      </Text>
      <ButtonGroup spacing={4} mb={6} width="100%" justifyContent="center">
        <Button
          color={'white'}
          bg={activeSheet === 'GameList' ? 'brand.primary' : 'gray'}
          onClick={() => handleSheetChange('GameList')}
        >
          Game List (Personal)
        </Button>
        <Button
          color={'white'}
          bg={activeSheet === 'GameListInf' ? '' : 'lightGray'}
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

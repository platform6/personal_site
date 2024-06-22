// src/pages/HomePage.js
import React, { useEffect } from 'react';
import {
  SimpleGrid,
  Box,
  Text,
  VStack,
  useBreakpointValue,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import MetaTags from '../components/MetaTags';
import Layout from '../components/Layout';

const HomePage = () => {
  //   const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data or perform any side effects here
    // fetch('/api/data')
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
  }, []);

  // Determine whether to use horizontal stack or grid based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });
  const content = (
    <>
      <Link to="/resume" style={{ display: 'flex', flexGrow: 1 }}>
        <Box bg="gray.100" p={{ base: 4, md: 6 }} borderRadius="md" flex="1">
          <Text fontSize={{ base: 'md', md: 'lg' }}>Resume</Text>
        </Box>
      </Link>
      <Link to="/elden" style={{ display: 'flex', flexGrow: 1 }}>
        <Box bg="gray.100" p={{ base: 4, md: 6 }} borderRadius="md" flex="1">
          <Text fontSize={{ base: 'md', md: 'lg' }}>
            Example of using an API to gather, sort, and filter data
          </Text>
        </Box>
      </Link>
    </>
  );

  return (
    <>
      <MetaTags
        title="Garrett Conn"
        description="Welcome to my portfolio"
        keywords="portfolio, web developer, React"
        image="/assets/profile_small.jpg"
        url="https://garrettconn.com"
      />
      <Layout>
        {isMobile ? (
          <VStack
            spacing={5}
            p={2}
            align="stretch"
            // border={'1px solid purple'}
          >
            {content}
          </VStack>
        ) : (
          <SimpleGrid
            columns={{ base: 1, md: 2 }}
            spacing={10}
            p={6}
            // border={'1px solid green'}
          >
            {content}
          </SimpleGrid>
        )}
      </Layout>
    </>
  );
};

export default HomePage;

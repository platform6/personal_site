// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { SimpleGrid, Box } from '@chakra-ui/react';
import MetaTags from '../components/MetaTags';
import Header from '../components/Header';
import Layout from '../components/Layout';

const HomePage = () => {
  //   const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch data or perform any side effects here
    // fetch('/api/data')
    //   .then((response) => response.json())
    //   .then((data) => setData(data));
  }, []);

  return (
    <>
      <MetaTags
        title="Garrett Conn"
        description="Welcome to my portfolio"
        keywords="portfolio, web developer, React"
        image="/assets/profile_small.jpg" // Replace with your image URL
        url="https://garrettconn.com"
      />
      <Header />
      <Layout>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          <Box bg="gray.100" p={4} borderRadius="md">
            {'hello'}
          </Box>
          <Box bg="gray.100" p={4} borderRadius="md">
            {'impressive things would go here!'}
          </Box>
        </SimpleGrid>
      </Layout>
    </>
  );
};

export default HomePage;

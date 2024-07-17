// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { Heading, SimpleGrid, Text } from '@chakra-ui/react';
import MetaTags from '../components/MetaTags';
import Layout from '../components/Layout';
import ResultCard from '../components/ResultCard';

const Elden = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://eldenring.fanapis.com/api/weapons')
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <MetaTags
        title="Garrett | Elden Ring Search UI"
        description="Elden ring search ui"
        keywords="portfolio, web developer, React, Elden Ring"
        image="https://garrettc.dev/assets/og_assets/knight_preview.jpg"
      />
      {!loading && (
        <Layout>
          <Heading>The Elden Ring Search UI</Heading>
          <Text>
            This is currently a work in progress with new functionality to be
            added.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
            {data &&
              data.map((weapon) => (
                <ResultCard key={weapon.id} data={weapon} />
              ))}
          </SimpleGrid>
        </Layout>
      )}
    </>
  );
};

export default Elden;

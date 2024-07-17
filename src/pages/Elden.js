// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import {
  Heading,
  SimpleGrid,
  Text,
  Link,
  Flex,
  Box,
  Spinner,
} from '@chakra-ui/react';
import MetaTags from '../components/MetaTags';
import Layout from '../components/Layout';
import ResultCard from '../components/ResultCard';
import TagSection from '../components/TagSection';

const Elden = () => {
  const [tag, setTag] = useState(['ammos']);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const baseUrl = 'https://eldenring.fanapis.com/api';
  const url = `${baseUrl}/${tag}`;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      // setError(null);
      try {
        const response = await fetch(url);
        const result = await response.json();
        setData(result.data);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [url]);

  const handleTagSelect = (tag) => {
    setTag(tag);
  };

  return (
    <>
      <MetaTags
        title="Garrett | Elden Ring Search UI"
        description="Elden ring search ui"
        keywords="portfolio, web developer, React, Elden Ring"
        image="https://garrettc.dev/assets/og_assets/knight_preview.jpg"
      />
      <Layout>
        <Heading mb={5} align={'center'}>
          Elden Ring Search UI
        </Heading>
        <Flex direction={'column'} paddingX={10} mb={7}>
          <Text>
            Step into the mystical realm of Elden Ring video game released by
            the studio FromSoftware like never before with this search
            interface. Designed for fans and adventurers alike, this tool lets
            you explore the game’s vast array of items with ease.
          </Text>
          <br></br>
          <Link
            color={'#9f037a'}
            isExternal
            href={'https://eldenring.fanapis.com/'}
            aria-label={'link to elden ring fan api'}
            fontWeight={'bold'}
          >
            Data provided from a fan made API
          </Link>{' '}
          <Text align={'center'} m={8}>
            UI by me!
          </Text>
          <Text>
            {' '}
            Navigate through the extensive collection of Elden Ring items at
            your fingertips. From powerful weapons and sturdy armors to rare
            incantations and elusive creatures, this interface allows you to
            dive deep into every category with just a click. Dive into the
            adventure with this Elden Ring Search UI and uncover the secrets of
            the Lands Between.
          </Text>
        </Flex>
        <Box mb={50}>
          <TagSection selectedTag={tag} onTagSelect={handleTagSelect} />
        </Box>
        {loading ? (
          <Spinner />
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="20px">
            {data &&
              data.map((result) => (
                <ResultCard key={result.id} data={result} />
              ))}
          </SimpleGrid>
        )}
      </Layout>
    </>
  );
};

export default Elden;

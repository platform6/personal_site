// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import { SimpleGrid, VStack, useBreakpointValue } from '@chakra-ui/react';
import MetaTags from '../components/MetaTags';
import Layout from '../components/Layout';
import sectionData from '../data/section.json';
import SectionCard from '../components/SectionCard';

const HomePage = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setSections(sectionData);
  }, []);

  // Determine whether to use horizontal stack or grid based on screen size
  const isMobile = useBreakpointValue({ base: true, md: false });
  const content = (
    <>
      {sections.map((section) => (
        <SectionCard
          key={section.id}
          link={section.link}
          heading={section.heading}
          text={section.text}
          img={section.img}
          alt={section.alt}
        />
      ))}
    </>
  );

  return (
    <>
      <MetaTags
        title="Garrett Conn"
        description="Welcome to my portfolio"
        keywords="portfolio, web developer, React"
        image="/resized/purpleBorder_horizontal-480.webp"
        alt="purple paint swosh"
        url="https://garrettc.dev"
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

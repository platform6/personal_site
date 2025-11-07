import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import profExp from '../data/profExp.json';
import ProfCard from '../components/ProfCard';
import Expertise from '../components/Expertise';
import Layout from '../components/Layout';
import MetaTags from '../components/MetaTags';

// const content = (
//   <>
//     {profExp.map((section, index) => (
//       <ProfCard key={index} {...section} />
//     ))}
//   </>
// );

const ProfExp = () => {
  return (
    <>
      <MetaTags
        title="Garrett Conn | Resume"
        description="A resume of software engineer Garrett Conn"
        keywords="resume, career, web, software, engineer"
        image="/assets/purpleBorder_horizontal.jpg"
        url="https://garrettconn.com"
      />
      <Layout bg="isabelline.400">
        <Box
          display="flex"
          minH="100px"
          justifyContent="center"
          alignItems="center"
          bg="hookersGreen.400"
        >
          <Heading fontSize={{ base: 'xl', md: 'xl' }} color={'white'}>
            PROFESSIONAL EXPERIENCE
          </Heading>
        </Box>
        <Expertise />
        <Box>
          {profExp.map((section, index) => (
            <ProfCard key={index} {...section} />
          ))}
        </Box>
      </Layout>
    </>
  );
};

export default ProfExp;

import React from 'react';
import { Box, Heading } from '@chakra-ui/react';
import profExp from '../data/profExp.json';
import ProfCard from '../components/ProfCard';
import Expertise from '../components/Expertise';
import Layout from '../components/Layout';

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
      <Layout>
        <Box
          display="flex"
          // border={'1px solid red'}
          minH="100px"
          justifyContent="center"
          alignItems="center"
          bg={'#D756B9'}
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

import React from 'react';
import { Box, Heading, Text, Flex, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import DOMPurify from 'dompurify';

const SectionCard = ({ link, heading, text, img, alt, external }) => {
  const sanitizedText = DOMPurify.sanitize(text);
  const cardContent = (
    <Box bg="gray.100" p={{ base: 2, md: 6 }} borderRadius="md">
      <Flex flexDirection="row" height={'250px'}>
        <Box
          bg="white"
          minW={90}
          mr={5}
          borderTopLeftRadius="md"
          borderBottomLeftRadius="md"
          border={'1px solid grey'}
          my={{ base: -2, md: -6 }}
          ml={{ base: -2, md: -6 }}
          overflow={'hidden'}
          position={'relative'}
        >
          <Image
            position={'absolute'}
            objectFit={'cover'}
            width={'100%'}
            height={'100%'}
            src={img}
            alt={alt}
          />
        </Box>
        <Flex flexDirection="column">
          <Heading size="sm" py="5">
            {heading}
          </Heading>
          <Text
            fontSize={{ base: 'sm', md: 'md' }}
            dangerouslySetInnerHTML={{ __html: sanitizedText }}
          />
        </Flex>
      </Flex>
    </Box>
  );

  if (external) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'flex', flexGrow: 1 }}
      >
        {cardContent}
      </a>
    );
  }

  return (
    <Link to={link} style={{ display: 'flex', flexGrow: 1 }}>
      {cardContent}
    </Link>
  );
};

export default SectionCard;

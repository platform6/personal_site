// src/components/Footer.js
import React from 'react';
import { Box, Icon, Link, HStack, Text, Flex } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faItchIo,
} from '@fortawesome/free-brands-svg-icons';

const SocialIcon = ({ href, icon, aria }) => (
  <Link href={href} isExternal aria-label={aria} mx={2}>
    <Icon
      as={FontAwesomeIcon}
      icon={icon}
      w={{ base: 10, md: 6 }}
      h={{ base: 12, md: 6 }}
    />
  </Link>
);

const Footer = () => {
  return (
    <Box
      border={'2px solid purple'}
      bg="#9f037a"
      color="white"
      py={{ base: 8, md: 4 }}
      mt={10}
      minHeight={'127px'}
    >
      <HStack justify="center" align="center" justifyContent={'space-evenly'}>
        <SocialIcon
          href="https://platform6.itch.io/"
          icon={faItchIo}
          aria={'Itch.io'}
        />
        <SocialIcon
          href="https://www.linkedin.com/in/garrettpconn/"
          icon={faLinkedin}
        />
        <SocialIcon
          href="https://github.com/platform6"
          icon={faGithub}
          aria={'Linkedin'}
        />
        <SocialIcon
          href="https://www.instagram.com/platform6/"
          icon={faInstagram}
          aria={'Instagram'}
        />
      </HStack>
      <Flex mt={5} align={'center'} flexDirection={'column'}>
        <Text>Concord, NH</Text>
        <Link
          textDecoration={'underline'}
          href="mailto:garrett.peter.conn@gmail.com"
          aria-label="Email"
        >
          garrett.peter.conn@gmail.com
        </Link>
      </Flex>
    </Box>
  );
};

export default Footer;

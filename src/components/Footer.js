// src/components/Footer.js
import React from 'react';
import { Box, Icon, Link, HStack } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

const SocialIcon = ({ href, icon }) => (
  <Link href={href} isExternal mx={2}>
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
      bg="#9f65b8"
      color="white"
      py={{ base: 10, md: 4 }}
      mt={10}
    >
      <HStack justify="center" align="center" justifyContent={'space-evenly'}>
        <SocialIcon href="https://x.com/platform6" icon={faXTwitter} />
        <SocialIcon
          href="https://www.linkedin.com/in/garrettpconn/"
          icon={faLinkedin}
        />
        <SocialIcon href="https://github.com/platform6" icon={faGithub} />
        <SocialIcon
          href="https://www.instagram.com/platform6/"
          icon={faInstagram}
        />
      </HStack>
    </Box>
  );
};

export default Footer;

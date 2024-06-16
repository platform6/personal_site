// src/components/Footer.js
import React from 'react';
import { Box, Flex, Icon, Link } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLinkedin,
  faGithub,
  faInstagram,
  faXTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={4} mt={10}>
      <Flex justify="center" align="center" direction="column">
        <Flex>
          <Link href="https://x.com/platform6" isExternal mx={2}>
            <Icon as={FontAwesomeIcon} icon={faXTwitter} w={6} h={6} />
          </Link>
          <Link
            href="https://www.linkedin.com/in/garrettpconn/"
            isExternal
            mx={2}
          >
            <Icon as={FontAwesomeIcon} icon={faLinkedin} w={6} h={6} />
          </Link>
          <Link href="https://github.com/platform6e" isExternal mx={2}>
            <Icon as={FontAwesomeIcon} icon={faGithub} w={6} h={6} />
          </Link>
          <Link href="https://www.instagram.com/platform6/" isExternal mx={2}>
            <Icon as={FontAwesomeIcon} icon={faInstagram} w={6} h={6} />
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Footer;

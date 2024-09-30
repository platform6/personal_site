import React from 'react';
import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import BattleDrawers from '../components/BattleDrawers';
import Layout from '../components/Layout';

const Battle = () => {
  const {
    isOpen: isLeftOpen,
    onOpen: onLeftOpen,
    onClose: onLeftClose,
  } = useDisclosure();
  const {
    isOpen: isRightOpen,
    onOpen: onRightOpen,
    onClose: onRightClose,
  } = useDisclosure();

  // mobile stuff //todo

  /*
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Add a resize listener to handle switching between mobile and desktop views
  window.addEventListener('resize', () => {
    setIsMobile(window.innerWidth < 768);
  }); */

  return (
    <Layout>
      <Flex
        direction="column"
        justify="space-between"
        align="center"
        height="100vh"
        // border={'3px solid tomato'}
      >
        {/* Middle square for the main battle */}
        <Box
          bg="gray.300"
          // width="100px"
          // height="100px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="md"
        >
          {/* Content for battle */}
          Unemployment
        </Box>

        {/* Bottom row for Player squares */}
        <Flex justify="center" mt="auto" mb={4}>
          <Box
            bg="blue.300"
            // width="100px"
            // height="100px"
            m={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Player 1
          </Box>
          <Box
            bg="blue.300"
            // width="100px"
            // height="100px"
            m={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Player 2
          </Box>
          <Box
            bg="blue.300"
            // width="100px"
            // height="100px"
            m={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Player 3
          </Box>
          <Box
            bg="blue.300"
            // width="100px"
            // height="100px"
            m={2}
            borderRadius="md"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            Player 4
          </Box>
          {/* Left Drawer for Attack Options */}
          <BattleDrawers
            placement="left"
            isOpen={isLeftOpen}
            onClose={onLeftClose}
          >
            <Box>Attack 1</Box>
            <Box>Attack 2</Box>
            <Box>Attack 3</Box>
          </BattleDrawers>

          {/* Right Drawer for Fill Meter */}
          <BattleDrawers
            placement="right"
            isOpen={isRightOpen}
            onClose={onRightClose}
          >
            <Box>Fill Meter Option 1</Box>
            <Box>Fill Meter Option 2</Box>
          </BattleDrawers>
        </Flex>
        <Flex>
          <>
            {/* Button to open the left drawer for "Attack Options" */}
            <Button onClick={onLeftOpen} m={4}>
              Open Attack Options
            </Button>
            {/* Button to open the right drawer for "Fill Meter" */}
            <Button onClick={onRightOpen} m={4}>
              Open Fill Meter
            </Button>
          </>
        </Flex>
      </Flex>
    </Layout>
  );
};

export default Battle;

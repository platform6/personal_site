import React from 'react';
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  CloseButton,
  Flex,
} from '@chakra-ui/react';

const BattleDrawers = ({ placement, isOpen, onClose, children }) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Drawer isOpen={isOpen} placement={placement} onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <Flex
              direction={'row'}
              justifyContent={placement === 'right' ? 'left' : 'right'}
              p={4}
            >
              <CloseButton onClick={onClose} />
            </Flex>
            <DrawerHeader>
              {placement === 'left' ? 'Attack Options' : 'Fill Meter'}
            </DrawerHeader>
            <DrawerBody>
              {/* Panel Content for mobile */}
              {children}
            </DrawerBody>
          </DrawerContent>
          1
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default BattleDrawers;

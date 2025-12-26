import { IconButton, useColorMode } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';

const ColorModeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === 'dark' ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
      variant="solid"
      size="md"
      _hover={{
        bg: colorMode === 'light' ? 'gray.100' : 'gray.700',
      }}
    />
  );
};

export default ColorModeToggle;

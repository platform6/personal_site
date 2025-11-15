import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  IconButton,
  Collapse,
  useDisclosure,
  Badge,
} from '@chakra-ui/react';
import { ChevronUpIcon, ChevronDownIcon } from '@chakra-ui/icons';

// Define color scheme presets
export const colorSchemes = {
  original: {
    name: 'Original',
    chart1: '#f9cff2', // mimiPink
    chart2: '#dae0f2', // lavenderWeb
    chart3: '#607466', // hookersGreen
    gradient1: '#f9cff2',
    gradient2: '#f9cff2',
    barColors: [
      '#f9cff2',
      '#dae0f2',
      '#607466',
      '#efb5b8',
      '#9eaea3',
      '#f2edeb',
      '#e1e6f4',
      '#fad7f4',
    ],
  },
  ocean: {
    name: 'Ocean Blues',
    chart1: '#4299e1', // blue.400
    chart2: '#63b3ed', // blue.300
    chart3: '#2c5282', // blue.800
    gradient1: '#4299e1',
    gradient2: '#2c5282',
    barColors: [
      '#4299e1',
      '#63b3ed',
      '#2c5282',
      '#3182ce',
      '#90cdf4',
      '#2b6cb0',
      '#bee3f8',
      '#1e4e8c',
    ],
  },
  sunset: {
    name: 'Sunset',
    chart1: '#fc8181', // red.300
    chart2: '#f6ad55', // orange.300
    chart3: '#d69e2e', // yellow.600
    gradient1: '#fc8181',
    gradient2: '#f6ad55',
    barColors: [
      '#fc8181',
      '#f6ad55',
      '#d69e2e',
      '#feb2b2',
      '#fbd38d',
      '#ed8936',
      '#ffa07a',
      '#ff6347',
    ],
  },
  forest: {
    name: 'Forest Green',
    chart1: '#68d391', // green.300
    chart2: '#9ae6b4', // green.200
    chart3: '#2f855a', // green.700
    gradient1: '#68d391',
    gradient2: '#2f855a',
    barColors: [
      '#68d391',
      '#9ae6b4',
      '#2f855a',
      '#48bb78',
      '#c6f6d5',
      '#38a169',
      '#84e1a1',
      '#22543d',
    ],
  },
  purple: {
    name: 'Purple Haze',
    chart1: '#b794f4', // purple.300
    chart2: '#d6bcfa', // purple.200
    chart3: '#6b46c1', // purple.700
    gradient1: '#b794f4',
    gradient2: '#6b46c1',
    barColors: [
      '#b794f4',
      '#d6bcfa',
      '#6b46c1',
      '#9f7aea',
      '#e9d8fd',
      '#805ad5',
      '#c4b5fd',
      '#553c9a',
    ],
  },
  warm: {
    name: 'Warm Earth',
    chart1: '#ed8936', // orange.500
    chart2: '#dd6b20', // orange.600
    chart3: '#c05621', // orange.700
    gradient1: '#ed8936',
    gradient2: '#c05621',
    barColors: [
      '#ed8936',
      '#dd6b20',
      '#c05621',
      '#f6ad55',
      '#bd4e18',
      '#9c4221',
      '#fbd38d',
      '#7c2d12',
    ],
  },
  cool: {
    name: 'Cool Mint',
    chart1: '#4fd1c5', // teal.300
    chart2: '#81e6d9', // teal.200
    chart3: '#2c7a7b', // teal.700
    gradient1: '#4fd1c5',
    gradient2: '#2c7a7b',
    barColors: [
      '#4fd1c5',
      '#81e6d9',
      '#2c7a7b',
      '#38b2ac',
      '#b2f5ea',
      '#319795',
      '#99f6e4',
      '#234e52',
    ],
  },
  monochrome: {
    name: 'Monochrome',
    chart1: '#718096', // gray.500
    chart2: '#a0aec0', // gray.400
    chart3: '#2d3748', // gray.700
    gradient1: '#718096',
    gradient2: '#2d3748',
    barColors: [
      '#718096',
      '#a0aec0',
      '#2d3748',
      '#4a5568',
      '#cbd5e0',
      '#1a202c',
      '#e2e8f0',
      '#171923',
    ],
  },
};

const ColorSchemeSwitcher = ({ currentScheme, onSchemeChange }) => {
  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

  return (
    <Box
      position="fixed"
      bottom={{ base: 2, md: 4 }}
      right={{ base: 2, md: 4 }}
      bg="white"
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor="gray.200"
      zIndex={1000}
      maxW={{ base: '280px', md: '300px' }}
      maxH={{ base: '70vh', md: 'auto' }}
      overflowY="auto"
    >
      <HStack
        p={{ base: 2, md: 3 }}
        borderBottom={isOpen ? '1px solid' : 'none'}
        borderColor="gray.200"
        justify="space-between"
        cursor="pointer"
        onClick={onToggle}
      >
        <HStack spacing={{ base: 1, md: 2 }}>
          <Text fontWeight="semibold" fontSize={{ base: 'xs', md: 'sm' }}>
            Color Schemes
          </Text>
          <Badge colorScheme="purple" fontSize="xs">
            Testing
          </Badge>
        </HStack>
        <IconButton
          size="xs"
          icon={isOpen ? <ChevronDownIcon /> : <ChevronUpIcon />}
          variant="ghost"
          aria-label="Toggle color scheme panel"
        />
      </HStack>

      <Collapse in={isOpen} animateOpacity>
        <VStack p={{ base: 2, md: 3 }} spacing={2} align="stretch">
          {Object.entries(colorSchemes).map(([key, scheme]) => (
            <Button
              key={key}
              size={{ base: 'xs', md: 'sm' }}
              variant={currentScheme === key ? 'solid' : 'outline'}
              colorScheme={currentScheme === key ? 'purple' : 'gray'}
              onClick={() => onSchemeChange(key)}
              justifyContent="space-between"
              fontSize={{ base: 'xs', md: 'sm' }}
              rightIcon={
                <HStack spacing={1}>
                  <Box
                    w={{ base: 2.5, md: 3 }}
                    h={{ base: 2.5, md: 3 }}
                    borderRadius="sm"
                    bg={scheme.chart1}
                    border="1px solid"
                    borderColor="gray.300"
                  />
                  <Box
                    w={{ base: 2.5, md: 3 }}
                    h={{ base: 2.5, md: 3 }}
                    borderRadius="sm"
                    bg={scheme.chart2}
                    border="1px solid"
                    borderColor="gray.300"
                  />
                  <Box
                    w={{ base: 2.5, md: 3 }}
                    h={{ base: 2.5, md: 3 }}
                    borderRadius="sm"
                    bg={scheme.chart3}
                    border="1px solid"
                    borderColor="gray.300"
                  />
                </HStack>
              }
            >
              {scheme.name}
            </Button>
          ))}
        </VStack>
      </Collapse>
    </Box>
  );
};

export default ColorSchemeSwitcher;

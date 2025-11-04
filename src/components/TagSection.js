import React from 'react';
import { Button, SimpleGrid } from '@chakra-ui/react';

const TagSection = ({ selectedTag, onTagSelect }) => {
  const apiItems = {
    Ammos: 'ammos',
    Armors: 'armors',
    'Ashes of War': 'ashes',
    Bosses: 'bosses',
    Classes: 'classes',
    Creatures: 'creatures',
    Incantations: 'incantations',
    Items: 'items',
    Locations: 'locations',
    NPCs: 'npcs',
    Shields: 'shields',
    Sorceries: 'sorceries',
    Spirits: 'spirits',
    Talismans: 'talismans',
    Weapons: 'weapons',
  };

  return (
    <>
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={4}>
        {Object.keys(apiItems).map((item) => (
          <Button
            color="white"
            key={item}
            _hover={{ bg: '#d756b9' }}
            onClick={() => onTagSelect(apiItems[item])}
            background={
              selectedTag === apiItems[item] ? '#F4C3E9' : 'brand.primary'
            }
          >
            {item}
          </Button>
        ))}
      </SimpleGrid>
      {/* <Box>{data[0].name}</Box> */}
    </>
  );
};

export default TagSection;

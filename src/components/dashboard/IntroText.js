import { useState, useEffect } from 'react';
import { Text, Box, SimpleGrid } from '@chakra-ui/react';
import AnimatedHeader from './AnimatedHeader';

const IntroText = () => {
  const [content, setContent] = useState('');

  useEffect(() => {
    fetch('/data/dashboard intro text.md')
      .then((response) => response.text())
      .then((text) => setContent(text))
      .catch((error) => console.error('Error loading intro text:', error));
  }, []);

  const parseContent = () => {
    if (!content) return null;

    const gridItems = [];
    const lines = content.split('\n');
    let currentSection = [];
    let currentParagraphs = [];
    let key = 0;

    const finishSection = () => {
      if (currentSection.length > 0) {
        gridItems.push(
          <Box key={key++}>
            {currentSection.map((item, idx) => (
              <Box key={idx}>{item}</Box>
            ))}
          </Box>
        );
        currentSection = [];
      }
    };

    lines.forEach((line) => {
      // Check for animated header (###)
      if (line.trim().startsWith('###')) {
        // Save any accumulated paragraph first
        if (currentParagraphs.length > 0) {
          currentSection.push(
            <Text fontSize="sm" px={1} mb={3}>
              {currentParagraphs.join('\n')}
            </Text>
          );
          currentParagraphs = [];
        }
        // Finish previous section before starting new one with header
        finishSection();
        // Add animated header to new section
        const headerText = line.replace(/^###\s*/, '').trim();
        currentSection.push(<AnimatedHeader data={headerText} />);
      } else if (line.trim() === '') {
        // Empty line - end current paragraph if it exists
        if (currentParagraphs.length > 0) {
          currentSection.push(
            <Text fontSize="sm" px={1} mb={3}>
              {currentParagraphs.join('\n')}
            </Text>
          );
          currentParagraphs = [];
        }
      } else {
        // Regular text line - add to current paragraph
        currentParagraphs.push(line);
      }
    });

    // Add any remaining paragraph
    if (currentParagraphs.length > 0) {
      currentSection.push(
        <Text fontSize="sm" px={3} mb={3}>
          {currentParagraphs.join('\n')}
        </Text>
      );
    }

    // Finish the last section
    finishSection();

    return gridItems;
  };

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2 }}
      spacing={{ base: 4, md: 4 }}
      mb={8}
    >
      {parseContent()}
    </SimpleGrid>
  );
};

export default IntroText;

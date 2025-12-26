import { Text, Box, SimpleGrid } from '@chakra-ui/react';
import AnimatedHeader from './AnimatedHeader';
import useMarkdownContent from '../../hooks/useMarkdownContent';
import { parseIntroTextSections } from '../../utils/markdownParser';

const IntroText = () => {
  const { content } = useMarkdownContent('/data/dashboard intro text.md');

  const parseContent = () => {
    if (!content) return null;

    const sections = parseIntroTextSections(content);

    const gridItems = sections.map((section, key) => (
      <Box key={key}>
        {section.header && <AnimatedHeader data={section.header} />}
        {section.paragraphs.map((paragraph, idx) => (
          <Text key={idx} fontSize="sm" px={1} mb={3} whiteSpace="pre-line">
            {paragraph}
          </Text>
        ))}
      </Box>
    ));

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

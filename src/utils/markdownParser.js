/**
 * Shared utility functions for parsing markdown content
 */

/**
 * Parses markdown text into paragraphs by splitting on blank lines
 * Preserves line breaks within paragraphs
 * @param {string} text - The markdown text to parse
 * @returns {Array<string>} Array of paragraph strings
 */
export const parseTextIntoParagraphs = (text) => {
  if (!text) return [];

  // Split on double newlines (blank lines)
  const paragraphs = text
    .split('\n\n')
    .map((para) => para.trim())
    .filter((para) => para.length > 0);

  return paragraphs;
};

/**
 * Parses a game section from completed games markdown
 * @param {string} section - A single game section from the markdown
 * @returns {Object} Parsed game object with name, completedDate, writeup, and paragraphs
 */
export const parseGameSection = (section) => {
  const lines = section.split('\n');
  let name = '';
  let completedDate = null;
  let nameIndex = -1;
  let writeupStartIndex = -1;

  // First pass: find name, date, and where writeup starts
  lines.forEach((line, index) => {
    if (line.startsWith('## ')) {
      name = line.replace('## ', '').trim();
      nameIndex = index;
    } else if (line.startsWith('completedDate:')) {
      const date = line.replace('completedDate:', '').trim();
      completedDate = date || null;
      writeupStartIndex = index + 1; // Writeup starts after completedDate
    }
  });

  if (!name) {
    return null;
  }

  // If no completedDate was found, writeup starts after the name line
  if (writeupStartIndex === -1 && nameIndex !== -1) {
    writeupStartIndex = nameIndex + 1;
  }

  // Extract writeup preserving blank lines
  let writeupText = 'Write-up coming soon...';

  if (writeupStartIndex > -1 && writeupStartIndex < lines.length) {
    // Get all lines after the start index, join with \n (preserving blank lines)
    const writeupLines = lines.slice(writeupStartIndex);
    writeupText = writeupLines.join('\n').trim();
  }

  if (!writeupText) {
    writeupText = 'Write-up coming soon...';
  }

  // Split writeup into paragraphs
  const paragraphs = parseTextIntoParagraphs(writeupText);

  return {
    name,
    completedDate,
    writeup: writeupText,
    paragraphs,
  };
};

/**
 * Parses intro text sections with headers and paragraphs
 * Used for dashboard intro text with ### headers
 * @param {string} content - The full markdown content
 * @returns {Array<Object>} Array of section objects with headers and paragraphs
 */
export const parseIntroTextSections = (content) => {
  if (!content) return [];

  const sections = [];
  const lines = content.split('\n');
  let currentSection = {
    header: null,
    paragraphs: [],
  };
  let currentParagraphLines = [];

  const finishParagraph = () => {
    if (currentParagraphLines.length > 0) {
      currentSection.paragraphs.push(currentParagraphLines.join('\n'));
      currentParagraphLines = [];
    }
  };

  const finishSection = () => {
    finishParagraph();
    if (currentSection.header || currentSection.paragraphs.length > 0) {
      sections.push({ ...currentSection });
      currentSection = {
        header: null,
        paragraphs: [],
      };
    }
  };

  lines.forEach((line) => {
    // Check for animated header (###)
    if (line.trim().startsWith('###')) {
      // Finish previous section before starting new one
      finishSection();
      // Set the header for the new section
      const headerText = line.replace(/^###\s*/, '').trim();
      currentSection.header = headerText;
    } else if (line.trim() === '') {
      // Empty line - end current paragraph if it exists
      finishParagraph();
    } else {
      // Regular text line - add to current paragraph
      currentParagraphLines.push(line);
    }
  });

  // Finish the last section
  finishSection();

  return sections;
};

# Example Markdown Format Guide

This file demonstrates the markdown format used for content management in the application.

---

## Format 1: Dashboard Intro Text (dashboard intro text.md)

### Section Header

This format uses triple hash (###) for animated headers that create new grid sections.

Each paragraph is separated by blank lines.
Multiple lines without blank lines between them become a single paragraph.

### Another Section

When you add another ### header, it starts a new grid column.
This creates a nice two-column layout on desktop and single column on mobile.

---

## Format 2: Games Data (completed_games_2025.md)

This format uses:

- Double hash (##) for game titles
- `completedDate:` metadata on the next line
- Everything after becomes the write-up/description
- Triple dash (---) to separate game entries

Example structure:

## Game Title Here

completedDate: 2025-01-15

This is the write-up for the game. You can write multiple paragraphs.

The parser will capture everything after the completedDate as the writeup text.
You can include line breaks and they will be preserved in the display.

---

## Another Game

completedDate: 2025-02-20

Another write-up here...

---

## Usage Instructions

### How to use useMarkdownContent hook:

```javascript
import useMarkdownContent from '../../hooks/useMarkdownContent';

const MyComponent = () => {
  const { content, loading, error } = useMarkdownContent('/data/your-file.md');

  // content: string - the raw markdown text
  // loading: boolean - true while fetching
  // error: Error | null - any fetch errors

  // Parse and display your content...
};
```

All markdown content files go in: `public/data/`

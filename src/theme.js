// theme.js
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: `'Space Grotesk', sans-serif`,
    body: `'Inter', sans-serif`,
  },
  styles: {
    global: {
      body: {
        bg: 'white', // Default background
        color: 'black', // Default text color
        margin: 0,
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
      },
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: `'Space Grotesk', sans-serif`,
        fontOpticalSizing: 'auto',
        fontWeight: 700,
        fontStyle: 'normal',
      },
      code: {
        fontFamily: `source-code-pro, Menlo, Monaco, Consolas, 'Courier New', monospace`,
      },
    },
  },
  colors: {
    brand: {
      primary: '#1b0607',
      secondary: '#1b0607', // Keep your old color as secondary if needed
      // Add other brand colors here
    },
  },
});

export default theme;

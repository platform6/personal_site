// theme.js
import { extendTheme, Thead } from '@chakra-ui/react';

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
      primary: '#320b0d',
      secondary: '#607466',
    },
    blackBean: {
      50: '#fef5fc',
      100: '#fcfbfa',
      200: '#efb5b8',
      300: '#df6c72',
      400: '#c52b33',
      500: '#320b0d', // DEFAULT
      600: '#28090a',
      700: '#1e0708',
      800: '#140405',
      900: '#0a0203',
    },
    hookersGreen: {
      50: '#f7f9fc',
      100: '#dfe4e0',
      200: '#bfc9c2',
      300: '#9eaea3',
      400: '#7e9384',
      500: '#607466', // DEFAULT
      600: '#4e5d53',
      700: '#3a463e',
      800: '#272f29',
      900: '#131715',
    },
    isabelline: {
      50: '#fcfbfa',
      100: '#f8f6f5',
      200: '#f5f2f0',
      300: '#f2edeb',
      400: '#efe9e7', // DEFAULT
      500: '#c9b5ae',
      600: '#a48176',
      700: '#71544b',
      800: '#382a26',
      900: '#1a1311',
    },
    lavenderWeb: {
      50: '#f7f9fc',
      100: '#f0f2fa',
      200: '#e8ecf7',
      300: '#e1e6f4',
      400: '#dae0f2', // DEFAULT
      500: '#95a6da',
      600: '#516ec2',
      700: '#304688',
      800: '#182344',
      900: '#0c1122',
    },
    mimiPink: {
      50: '#fef5fc',
      100: '#fdebfa',
      200: '#fbe1f7',
      300: '#fad7f4',
      400: '#f9cff2', // DEFAULT
      500: '#ef7cdc',
      600: '#e52bc6',
      700: '#a2148a',
      800: '#510a45',
      900: '#280523',
    },
  },
});

export default theme;

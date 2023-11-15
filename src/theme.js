import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
  },
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6347',
    accent: '#FFA500',
    // Add more colors as needed
  },
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
  },
  // Add other theme configurations such as shadows, borders, etc.
});

export default theme;

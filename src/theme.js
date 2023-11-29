import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'body': {
        backgroundColor: 'gray.700',
      },
      '::-webkit-scrollbar': {
        width: '8px',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'gray.300',
        borderRadius: 'lg',
      },
      '::-webkit-scrollbar-track': {
        bg: 'gray.100',
      },
    },
  },
  fonts: {
    body: 'Roboto, sans-serif',
    heading: 'Poppins, sans-serif',
  },
  colors: {
    primary: '#6C63FF',
    secondary: '#FF6347',
    accent: '#FFA500',
  },
  breakpoints: {
    sm: '30em', // 480px
    md: '48em', // 768px
    lg: '62em', // 992px
    xl: '80em', // 1280px
  },
});

export default theme;

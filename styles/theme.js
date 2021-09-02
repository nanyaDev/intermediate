import { extendTheme } from '@chakra-ui/react';

const Input = {
  baseStyle: {
    field: {
      _focus: {
        boxShadow: 'none',
        borderColor: 'gray.200',
      },
      _focusVisible: {
        boxShadow: 'none',
        borderColor: 'gray.200',
      },
    },
  },
};

const Textarea = {
  baseStyle: {
    _focus: {
      boxShadow: 'none',
      borderColor: 'gray.200',
    },
    _focusVisible: {
      boxShadow: 'none',
      borderColor: 'gray.200',
    },
  },
};

const theme = extendTheme({
  styles: {
    global: {
      html: {
        scrollBehavior: 'smooth',
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      },
    },
  },
  fonts: {
    body: `-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"`,
  },
  components: { Input, Textarea },
});

export default theme;

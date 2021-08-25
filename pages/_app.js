import { ChakraProvider } from '@chakra-ui/react';
// cf. https://github.com/chakra-ui/chakra-ui/issues/3449
import 'focus-visible/dist/focus-visible';

import theme from '@/styles/theme';
import Navbar from '@/components/Navbar';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;

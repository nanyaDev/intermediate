import { ChakraProvider } from '@chakra-ui/react';
// cf. https://github.com/chakra-ui/chakra-ui/issues/3449
import 'focus-visible/dist/focus-visible';

import theme from '@/styles/theme';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/lib/auth';

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Navbar />
        <Component {...pageProps} />
      </AuthProvider>
    </ChakraProvider>
  );
};

export default MyApp;

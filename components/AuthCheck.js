import NextLink from 'next/link';
import { Center, Text, Link } from '@chakra-ui/layout';

import { useAuth } from '@/lib/auth';

const AuthCheck = ({ children, fallback }) => {
  const { username } = useAuth();

  return username ? children : fallback || <SignInPrompt />;
};

const SignInPrompt = () => (
  <Center h="full">
    <Text fontSize="18px">
      You must be{' '}
      <NextLink href="/enter" passHref>
        <Link color="blue.500">signed in</Link>
      </NextLink>{' '}
      to access this page!
    </Text>
  </Center>
);

export default AuthCheck;

import { Button, Divider, Heading, Icon, Text } from '@chakra-ui/react';
import { GithubLogo, GoogleLogo } from '@/styles/icons';
import { FaUserSecret } from 'react-icons/fa';

import { useAuth } from '@/lib/auth';
import Card from './Card';

const LoginOptions = () => {
  const auth = useAuth();

  return (
    <>
      <Heading fontSize={'4xl'}>Sign in to your account</Heading>
      <Text fontSize="lg" color="gray.600">
        to enjoy all of our cool features ✌️
      </Text>
      <Card>
        <GithubLoginButton onClick={() => auth.signinWithGithub()} />
        <GoogleLoginButton onClick={() => auth.signinWithGoogle()} />
        <Divider borderColor="gray.400" />
        <AnonLoginButton onClick={() => auth.signinAnonymously()} />
      </Card>
    </>
  );
};

const GithubLoginButton = (props) => (
  <Button
    backgroundColor="gray.900"
    color="white"
    fontWeight="medium"
    leftIcon={<GithubLogo />}
    _hover={{ bg: 'gray.700' }}
    _active={{
      bg: 'gray.800',
      transform: 'scale(0.95)',
    }}
    {...props}
  >
    Continue with GitHub
  </Button>
);

const GoogleLoginButton = (props) => (
  <Button
    backgroundColor="white"
    color="gray.900"
    variant="outline"
    fontWeight="medium"
    leftIcon={<GoogleLogo />}
    _hover={{ bg: 'gray.100' }}
    _active={{
      bg: 'gray.100',
      transform: 'scale(0.95)',
    }}
    {...props}
  >
    Continue with Google
  </Button>
);

const AnonLoginButton = (props) => (
  <Button
    backgroundColor="gray.600"
    color="white"
    variant="outline"
    fontWeight="medium"
    leftIcon={<Icon as={FaUserSecret} />}
    _hover={{ bg: 'gray.500' }}
    _active={{
      bg: 'gray.500',
      transform: 'scale(0.95)',
    }}
    {...props}
  >
    Continue Anonymously
  </Button>
);

export default LoginOptions;

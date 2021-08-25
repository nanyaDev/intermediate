import { GithubLogo, GoogleLogo } from '@/styles/icons';
import { Button, Divider, Heading, Icon, Text, VStack } from '@chakra-ui/react';
import { HiOutlineMail } from 'react-icons/hi';

import { useAuth } from '@/lib/auth';

const LoginOptions = () => {
  const auth = useAuth();

  return (
    <>
      <Heading fontSize={'4xl'}>Sign in to your account</Heading>
      <Text fontSize="lg" color="gray.600">
        to enjoy all of our cool features ✌️
      </Text>
      <Card>
        <GithubLoginButton />
        <GoogleLoginButton onClick={() => auth.signinWithGoogle()} />
        <Divider borderColor="gray.400" />
        <EmailLoginButton />
      </Card>
    </>
  );
};

const Card = ({ children }) => (
  <VStack
    w="sm"
    mt={4}
    px={6}
    py={12}
    spacing={4}
    boxShadow="2xl"
    rounded="lg"
    align="stretch"
  >
    {children}
  </VStack>
);

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

const EmailLoginButton = () => (
  <Button
    backgroundColor="gray.600"
    color="white"
    variant="outline"
    fontWeight="medium"
    leftIcon={<Icon as={HiOutlineMail} />}
    _hover={{ bg: 'gray.500' }}
    _active={{
      bg: 'gray.500',
      transform: 'scale(0.95)',
    }}
  >
    Continue with Email
  </Button>
);

export default LoginOptions;

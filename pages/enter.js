import Image from 'next/image';
import { Box, Flex } from '@chakra-ui/react';

import { LoginOptions, UsernameForm, WelcomeMessage } from '@/components/enter';
import loginSplash from '@/public/login-splash.jpg';

const Enter = () => {
  const user = true;
  const username = true;
  // pass
  return (
    <Flex grow={1} align="stretch">
      <Box w="50%" pos="relative">
        <Image
          src={loginSplash}
          alt=""
          placeholder="blur"
          layout="fill"
          objectFit="cover"
        />
      </Box>
      <Flex
        w="50%"
        direction="column"
        justify="center"
        align="center"
        bg="white"
      >
        {user ? (
          username ? (
            <WelcomeMessage />
          ) : (
            <UsernameForm />
          )
        ) : (
          <LoginOptions />
        )}
      </Flex>
    </Flex>
  );
};

export default Enter;

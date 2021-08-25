import NextLink from 'next/link';
import { Avatar, Button, Flex, Link, Stack } from '@chakra-ui/react';

import { Logo } from '@/styles/icons';

const Navbar = () => {
  const user = true;
  const username = true;

  return (
    <Flex
      as="nav"
      justify="space-between"
      px={8}
      py={4}
      bg="white"
      borderBottom="1px"
      borderColor="gray.200"
    >
      <NextLink href="/" passHref>
        <Link>
          <Logo boxSize="3rem" />
        </Link>
      </NextLink>
      <Stack spacing={4} isInline align="center">
        {username && (
          <>
            <NextLink href="/admin" passHref>
              <Button as="a" variant="outline">
                Write Posts
              </Button>
            </NextLink>
            <NextLink href={`/${username}`} passHref>
              <Avatar as="a" name={user?.name} src={user?.photoURL} size="sm" />
            </NextLink>
          </>
        )}
        {!username && (
          <>
            <NextLink href="/enter" passHref>
              <Button as="a" colorScheme="blue">
                Log In
              </Button>
            </NextLink>
          </>
        )}
      </Stack>
    </Flex>
  );
};

export default Navbar;

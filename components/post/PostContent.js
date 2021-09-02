import { useState } from 'react';
import Link from 'next/link';
// prettier-ignore
import { Box, Flex, Heading, HStack, Text, useToast, VStack } from '@chakra-ui/react';

import Markdown from '../Markdown';
import InteractiveHeart from './InteractiveHeart';
import AuthCheck from '../AuthCheck';
import HeartButton from './HeartButton';

const PostContent = ({ post, path }) => {
  const createdAt =
    typeof post?.createdAt === 'number'
      ? new Date(post.createdAt)
      : post.createdAt.toDate();

  return (
    <Box w="container.sm">
      <Flex justify="space-between">
        <Box>
          <HStack align="flex-end" spacing={4}>
            <Heading color="gray.700" mb={-1}>
              {post.title}
            </Heading>
            <Link href={`/${post.username}`} passHref>
              <Text as="a" d="block" color="gray.500" fontWeight="medium">
                by @{post.username}
              </Text>
            </Link>
          </HStack>
          <Text
            as="a"
            d="block"
            color="gray.500"
            fontWeight="medium"
            mt={4}
            mb={8}
          >
            {createdAt.toLocaleDateString('en-US', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </Text>
        </Box>
        <VStack color="gray.400" spacing={0}>
          <AuthCheck
            fallback={<UninteractiveHeart heartCount={post.heartCount} />}
          >
            <InteractiveHeart path={path} heartCount={post.heartCount} />
          </AuthCheck>
        </VStack>
      </Flex>
      <Markdown>{post.content}</Markdown>
    </Box>
  );
};

const UninteractiveHeart = ({ heartCount }) => {
  const toast = useToast();

  const promptSignIn = () => {
    toast({
      title: 'Log In First!',
      status: 'error',
      duration: 3000,
    });
  };

  return (
    <>
      <HeartButton onClick={promptSignIn} />
      <Text fontSize="lg" fontWeight="semibold">
        {heartCount || '0'}
      </Text>
    </>
  );
};

export default PostContent;

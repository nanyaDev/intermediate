import Link from 'next/link';
// prettier-ignore
import { Box, Flex, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const PostFeed = ({ posts, admin }) => {
  return posts
    ? posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))
    : null;
};

const PostItem = ({ post, admin }) => {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <Flex
      w="container.sm"
      justify="space-between"
      align="center"
      p={4}
      mt={8}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Box>
        <Link href={`/${post.username}/${post.slug}`} passHref>
          <Heading as="a" size="lg" d="block" color="gray.700" mb={4}>
            {post.title}
          </Heading>
        </Link>
        <Flex align="flex-end">
          <Link href={`/${post.username}`} passHref>
            <Text as="a" color="gray.500" fontWeight="medium" pb={1}>
              by @{post.username}
            </Text>
          </Link>
          <Text color="gray.500" fontWeight="medium" pb={1} mx="6px">
            •
          </Text>
          <Text color="gray.500" fontWeight="medium" pb={1}>
            ☕️ {minutesToRead} min read
          </Text>
        </Flex>
      </Box>
      <VStack color="gray.400">
        <IconButton
          icon={<FaHeart size={24} />}
          variant="ghost"
          size="lg"
          borderRadius="100%"
          aria-label="heart"
        />
        <Text fontSize="lg" fontWeight="semibold">
          {post.heartCount || '0'}
        </Text>
      </VStack>
    </Flex>
  );
};

export default PostFeed;

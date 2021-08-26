import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
// prettier-ignore
import { Box, Flex, Heading, HStack, IconButton, Text, VStack } from '@chakra-ui/react';
import { FaHeart } from 'react-icons/fa';

const PostContent = ({ post }) => {
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
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </Box>
  );
};

export default PostContent;

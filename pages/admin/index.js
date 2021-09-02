import NextLink from 'next/link';
import { useEffect, useState } from 'react';
import { Button, Divider, Flex, Heading } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

import AuthCheck from '@/components/AuthCheck';
import PostFeed from '@/components/PostFeed';
import { fireauth, firestore } from '@/lib/firebase';

const Admin = () => {
  return (
    <AuthCheck>
      <PostList />
    </AuthCheck>
  );
};

// can't embed this in Admin because the AuthCheck is needed to ensure fireauth.currentUser !== null
const PostList = () => {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    (async () => {
      const postsRef = firestore
        .collection('users')
        .doc(fireauth.currentUser.uid)
        .collection('posts');
      const snapshot = await postsRef.orderBy('createdAt').get();
      const data = snapshot.docs.map((d) => d.data());

      setPosts(data);
    })();
  }, []);

  return (
    <>
      <Flex direction="column" align="center" p={8}>
        <Flex w="container.sm" justify="space-between" align="center" px={4}>
          <Heading color="gray.800" py={4}>
            Manage your Posts 🛠
          </Heading>
          <NextLink href="/admin/create" passHref>
            <Button as="a" colorScheme="blue" rightIcon={<AddIcon />}>
              New
            </Button>
          </NextLink>
        </Flex>
        <PostFeed posts={posts} admin />
      </Flex>
    </>
  );
};

export default Admin;

import { useState } from 'react';
import { Button, Flex, Text } from '@chakra-ui/react';

import { firestore } from '@/lib/firebase';
import { fromMillis, postToJSON } from '@/utils/firebase';
import PostFeed from '@/components/PostFeed';

const LIMIT = 5;

export const getServerSideProps = async () => {
  const postsQuery = firestore
    .collectionGroup('posts')
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts },
  };
};

const Home = ({ posts: initialPosts }) => {
  const [posts, setPosts] = useState(initialPosts);
  const [loading, setLoading] = useState(false);
  const [postsEnd, setPostsEnd] = useState(false);

  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor =
      typeof last.createdAt === 'number'
        ? fromMillis(last.createdAt)
        : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);
  };

  return (
    <Flex direction="column" align="center" p={8}>
      <PostFeed posts={posts} admin={false} />
      {!postsEnd && (
        <Button my={8} onClick={getMorePosts} isLoading={loading}>
          Load More
        </Button>
      )}
      {postsEnd && <Text>You have reached the end!</Text>}
    </Flex>
  );
};

export default Home;

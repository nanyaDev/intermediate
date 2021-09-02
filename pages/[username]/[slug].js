import { Flex } from '@chakra-ui/react';

import { firestore } from '@/lib/firebase';
import { getUserWithUsername, postToJSON } from '@/utils/firebase';
import PostContent from '@/components/post/PostContent';

export const getStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 10000,
  };
};

export const getStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();

    return { params: { username, slug } };
  });

  return {
    paths,
    fallback: 'blocking',
  };
};

const Post = ({ post, path }) => {
  return (
    <Flex direction="column" align="center" py={16}>
      <PostContent post={post} path={path} />
    </Flex>
  );
};

export default Post;

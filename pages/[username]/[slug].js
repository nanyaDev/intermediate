import { Flex } from '@chakra-ui/react';

import { firestore } from '@/lib/firebase';
import { getUserWithUsername, postToJSON } from '@/utils/firebase';
import PostContent from '@/components/post/PostContent';

export const getStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username);

  let post;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug);
    post = postToJSON(await postRef.get());
  }

  return {
    props: { post },
    revalidate: 10000,
  };
};

export const getStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup('posts').get();

  const paths = snapshot.docs.map((doc) => {
    const { username, slug } = doc.data();

    return { params: { username, slug } };
  });

  console.log(paths);

  return {
    paths,
    fallback: 'blocking',
  };
};

const Post = ({ post }) => {
  return (
    <Flex direction="column" align="center" py={16}>
      <PostContent post={post} />
    </Flex>
  );
};

export default Post;

import { Flex } from '@chakra-ui/react';

import PostFeed from '@/components/PostFeed';
import { UserProfile } from '@/components/profile';
import { getUserWithUsername, postToJSON } from '@/utils/firebase';

export const getServerSideProps = async ({ params }) => {
  const { username } = params;

  const userDoc = await getUserWithUsername(username);

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(postToJSON);
  }

  return {
    props: { user, posts },
  };
};

const Profile = ({ user, posts }) => {
  return (
    <Flex direction="column" align="center" p={8}>
      <UserProfile user={user} />
      <PostFeed posts={posts} admin={false} />
    </Flex>
  );
};

export default Profile;

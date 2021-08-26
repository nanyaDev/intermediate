import { Avatar, Heading, Text, VStack } from '@chakra-ui/react';

const UserProfile = ({ user }) => {
  return (
    <VStack w="300px" spacing={0} my={4}>
      <Avatar src={user.photoURL} size="lg" alt="author" mb={4} />
      <Heading fontSize="2xl" fontWeight={500} fontFamily="body">
        {user.name || 'Anonymous User'}
      </Heading>
      <Text color="gray.500">@{user.username}</Text>
    </VStack>
  );
};

export default UserProfile;

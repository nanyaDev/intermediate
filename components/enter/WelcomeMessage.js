import { Heading, Text, VStack } from '@chakra-ui/react';

const WelcomeMessage = () => {
  return (
    <VStack spacing={4} mx={16} align="flex-start">
      <Heading color="gray.700">Welcome to Intermediate! 🎉</Heading>
      <Text color="gray.600">
        Head on over to your profile to get started with your first blog post.
        If you&#39;re more more of a lurker, you can check out blogs by your
        favorite authors on the home page. Have fun!
      </Text>
    </VStack>
  );
};

export default WelcomeMessage;

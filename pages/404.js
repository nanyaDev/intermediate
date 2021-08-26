import { Flex, Heading, Text } from '@chakra-ui/react';

const FourOhFour = () => (
  <Flex grow={1} direction="column" justify="center" align="center">
    <Heading color="gray.700" mb={8}>
      404
    </Heading>
    <Text fontSize="xl" color="gray.600">
      Yikes. That page doesn&#39;t exist :(
    </Text>
  </Flex>
);

export default FourOhFour;

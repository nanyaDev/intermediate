import { VStack } from '@chakra-ui/react';

const Card = ({ children }) => (
  <VStack
    w="sm"
    mt={4}
    px={6}
    py={12}
    spacing={4}
    boxShadow="2xl"
    rounded="lg"
    align="stretch"
  >
    {children}
  </VStack>
);

export default Card;

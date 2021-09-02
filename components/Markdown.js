/* eslint-disable react/display-name */
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Heading, Text } from '@chakra-ui/layout';

const newTheme = {
  h1: ({ children }) => (
    <Heading
      as="h1"
      mb={2}
      fontSize="30px"
      color="gray.800"
      fontWeight="semibold"
    >
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading
      as="h2"
      mb={2}
      fontSize="28px"
      color="gray.700"
      fontWeight="semibold"
    >
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading
      as="h3"
      mb={2}
      fontSize="24px"
      color="gray.600"
      fontWeight="medium"
    >
      {children}
    </Heading>
  ),
};

const Markdown = ({ children }) => (
  <ReactMarkdown components={ChakraUIRenderer(newTheme)}>
    {children}
  </ReactMarkdown>
);

export default Markdown;

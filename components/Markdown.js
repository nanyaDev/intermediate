/* eslint-disable react/display-name */
import ReactMarkdown from 'react-markdown';
import ChakraUIRenderer from 'chakra-ui-markdown-renderer';
import { Heading, Link } from '@chakra-ui/layout';

const newTheme = {
  h1: ({ children }) => (
    <Heading
      as="h1"
      my={5}
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
      my={4}
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
      my={3}
      fontSize="24px"
      color="gray.600"
      fontWeight="medium"
    >
      {children}
    </Heading>
  ),
  a: ({ children }) => <Link color="blue.500">{children}</Link>,
};

const Markdown = ({ children }) => (
  <ReactMarkdown components={ChakraUIRenderer(newTheme)}>
    {children}
  </ReactMarkdown>
);

export default Markdown;

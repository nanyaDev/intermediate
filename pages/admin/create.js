import { useState } from 'react';
import { useForm } from 'react-hook-form';
import kebabCase from 'lodash.kebabcase';

import AuthCheck from '@/components/AuthCheck';
// prettier-ignore
import { Box, Button, Flex, Heading, HStack, Input, Text, Textarea, useToast } from '@chakra-ui/react';
import firebase, { fireauth, firestore } from '@/lib/firebase';
import { useAuth } from '@/lib/auth';
import Markdown from '@/components/Markdown';

const Create = () => {
  return (
    <AuthCheck>
      <PostForm />
    </AuthCheck>
  );
};

const PostForm = () => {
  const { username } = useAuth();
  const [preview, setPreview] = useState(false);
  const { register, handleSubmit, reset, watch, formState } = useForm({
    mode: 'onChange',
  });
  const toast = useToast();

  const createPost = async ({ title, content }) => {
    const slug = encodeURI(kebabCase(title));
    const uid = fireauth.currentUser.uid;

    const postRef = firestore
      .collection('users')
      .doc(uid)
      .collection('posts')
      .doc(slug);

    await postRef.set({
      title,
      slug,
      uid,
      username,
      content,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
      heartCount: 0,
    });

    reset({ title: '', content: '' });
    toast({ title: 'Post created!', status: 'success', duration: 3000 });
  };

  return (
    <Flex h="full" direction="column" align="center">
      <Heading w="container.sm" color="gray.800" my={8}>
        Create Post ✍️
      </Heading>
      <Flex
        as="form"
        direction="column"
        grow={1}
        w="container.sm"
        onSubmit={handleSubmit(createPost)}
      >
        {preview ? (
          <>
            <Heading size="lg" mb={8}>
              {watch('title')}
            </Heading>
            <Box flexGrow={1}>
              <Markdown>{watch('content')}</Markdown>
            </Box>
          </>
        ) : (
          <>
            <Input
              {...register('title', {
                required: 'Title is required',
                minLength: { value: 5, message: 'Title is too short' },
              })}
              placeholder="Title"
            />
            <Text h="14px" fontSize="14px" color="red" pt={1}>
              {formState.errors.title?.message || null}
            </Text>
            <Textarea
              {...register('content', {
                required: 'Content is required',
                minLength: { value: 10, message: 'Content is too short' },
                maxLength: { value: 20000, message: 'Content is too long' },
              })}
              placeholder="Markdown Content"
              flexGrow={1}
              mt={8}
            />
            <Text h="14px" fontSize="14px" color="red" pt={1}>
              {formState.errors.content?.message || null}
            </Text>
          </>
        )}
        <HStack alignSelf="flex-end" spacing={4} my={8}>
          <Button colorScheme="blackAlpha" onClick={() => setPreview(!preview)}>
            Preview
          </Button>
          <Button
            type="submit"
            colorScheme="blue"
            isDisabled={!formState.isDirty || !formState.isValid}
          >
            Create Post
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
};

export default Create;

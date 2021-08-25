import { useState, useEffect, useCallback } from 'react';
import { Button, Heading, Input, Text, VStack } from '@chakra-ui/react';
import debounce from 'lodash.debounce';

import { useAuth } from '@/lib/auth';
import { firestore } from '@/lib/firebase';
import Card from './Card';

const UsernameForm = () => {
  const { user, username } = useAuth();
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (value.length < 3) {
      setInputValue(value);
      setIsLoading(false);
      setIsValid(false);
    } else if (re.test(value)) {
      setInputValue(value);
      setIsLoading(true);
      setIsValid(false);
    }
  };

  useEffect(() => {
    checkUsername(inputValue);
  }, [checkUsername, inputValue]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const checkUsername = useCallback(
    debounce(async (inputValue) => {
      if (inputValue.length >= 3) {
        const ref = firestore.doc(`usernames/${inputValue}`);
        const { exists } = await ref.get();
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setIsLoading(false);
      }
    }, 500),
    []
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${inputValue}`);

    const batch = firestore.batch();

    batch.set(userDoc, { username: inputValue, ...user });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  return (
    <>
      <Heading fontSize={'4xl'}>Pick a username</Heading>
      <Text fontSize={'lg'} color={'gray.600'}>
        the cooler the better 😎
      </Text>

      <Card>
        <VStack as="form" onSubmit={handleSubmit} spacing={4} align="stretch">
          <Input
            value={inputValue}
            onChange={handleChange}
            placeholder="Username"
          />
          <UsernameStatus
            username={username || null}
            isLoading={isLoading}
            isValid={isValid}
          />
          <Button type="submit" colorScheme="blue" isDisabled={!isValid}>
            Choose
          </Button>
        </VStack>
      </Card>
    </>
  );
};

const UsernameStatus = ({ username, isValid, isLoading }) => {
  if (isLoading) {
    return <Text color="gray.500">Checking...</Text>;
  } else if (isValid) {
    return <Text color="green">That&#39;s available! 👍</Text>;
  } else if (username && !isValid) {
    return <Text color="green">That username is already taken 😔</Text>;
  } else return null;
};

export default UsernameForm;

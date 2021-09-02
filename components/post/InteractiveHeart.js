import { useEffect, useState } from 'react';
// prettier-ignore
import { Text } from '@chakra-ui/react';

import firebase, { fireauth, firestore } from '@/lib/firebase';
import HeartButton from './HeartButton';

const InterativeHeart = ({ path, heartCount }) => {
  const [heart, setHeart] = useState(false);
  const [hearts, setHearts] = useState(heartCount);

  const uid = fireauth.currentUser.uid;
  const postRef = firestore.doc(path);
  const heartRef = postRef.collection('hearts').doc(uid);

  const addHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, {
      heartCount: firebase.firestore.FieldValue.increment(1),
    });
    batch.set(heartRef, { uid });

    await batch.commit();
    setHearts(hearts + 1);
  };

  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, {
      heartCount: firebase.firestore.FieldValue.increment(-1),
    });
    batch.delete(heartRef);

    await batch.commit();
    setHearts(hearts - 1);
  };

  useEffect(() => {
    const unsubscribe = heartRef.onSnapshot((snap) => {
      const data = snap.data();
      setHeart(!!data);
    });

    return unsubscribe;
  }, [heartRef]);

  return (
    <>
      <HeartButton
        onClick={heart ? removeHeart : addHeart}
        color={heart ? 'red.500' : null}
      />
      <Text fontSize="lg" fontWeight="semibold">
        {hearts || 0}
      </Text>
    </>
  );
};

export default InterativeHeart;

import firebase, { firestore } from '@/lib/firebase';

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
const getUserWithUsername = async (username) => {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
};

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
const postToJSON = (doc) => {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
};

const fromMillis = firebase.firestore.Timestamp.fromMillis;

export { getUserWithUsername, postToJSON, fromMillis };

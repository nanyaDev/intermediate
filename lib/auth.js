import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase, { firestore, fireauth } from './firebase';

const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const auth = useAuthProvider();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export const useAuth = () => {
  return useContext(authContext);
};

const useAuthProvider = () => {
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);

  const signinWithGoogle = async () => {
    const google = new firebase.auth.GoogleAuthProvider();
    return await fireauth.signInWithPopup(google);
  };

  const signinWithEmail = async (email, password) => {
    return fireauth.signInWithEmailAndPassword(email, password);
  };

  const signupWithEmail = async (email, password) => {
    return await fireauth.createUserWithEmailAndPassword(email, password);
  };

  const signout = async () => {
    return fireauth.signOut();
  };

  useEffect(() => {
    const unsubscribe = fireauth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(await formatUser(user));
      } else {
        setUser(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const users = firestore.collection('users').doc(user.uid);
      unsubscribe = users.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return {
    user,
    username,
    signinWithGoogle,
    signinWithEmail,
    signupWithEmail,
    signout,
  };
};

const formatUser = async (user) => {
  const token = await user.getIdToken();
  // removed token for now, might be good to put it in it's own state variable

  return {
    uid: user.uid,
    email: user.email,
    name: user.displayName,
    photoURL: user.photoURL,
    // token,
  };
};

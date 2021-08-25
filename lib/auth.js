import React, { useState, useEffect, useContext, createContext } from 'react';
import firebase, { firestore } from './firebase';

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
    return await firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider());
  };

  const signinWithEmail = async (email, password) => {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  };

  const signupWithEmail = async (email, password) => {
    return await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);
  };

  const signout = async () => {
    return firebase.auth().signOut();
  };

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
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

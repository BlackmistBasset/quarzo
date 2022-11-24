import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  getFirestore,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGID,
  appId: process.env.REACT_APP_APPID,
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebaseApp.auth();
const db = getFirestore(firebaseApp);
// const storage = getStorage(app);

// U S E R S

export const registerNewUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
};

export const getUserInfo = async (uid) => {
  try {
    const docRef = doc(db, "users", uid);
    const document = await getDoc(docRef);
    return document.data();
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (user) => {
  try {
    const collectionRef = collection(db, "users");
    console.log(user);
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
};

// C O M P R A S

export const addNewItem = async (item) => {
  try {
    const docRef = collection(db, "items");
    const res = await addDoc(docRef, item);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const listenItems = (callback) => {
  onSnapshot(collection(db, "items"), (perro) => {
    const items = [];
    perro.forEach((doc) => items.push(doc.data()));
    console.log(items);
    callback(items);
  });
};

// O B R A S

export const addNewObra = async (obra) => {
  try {
    const docRef = collection(db, "obras");
    const res = await addDoc(docRef, obra);
    return res;
  } catch (err) {
    console.log(err);
  }
};

export const getObras = async () => {
  const obras = [];
  try {
    const querySnapshot = await getDocs(collection(db, "obras"));
    querySnapshot.forEach((obra) => {
      obras.push(obra.data());
    });

    return obras;
  } catch (err) {
    console.log(err);
  }
};

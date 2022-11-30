import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { onAuthStateChanged } from "firebase/auth";
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
  query,
  where,
  updateDoc,
  arrayUnion,
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
    const docRef = doc(collectionRef, user.uid);
    await setDoc(docRef, user);
  } catch (err) {
    console.log(err);
  }
};

// C O M P R A S

let selectedObra = "";

const getUserObra = async () => {
  onAuthStateChanged(auth, async (user) => {
    const userInfo = await getUserInfo(user.uid);
    selectedObra = userInfo.currentObra;
    return userInfo;
  });
};

export const listenItems = async (callback) => {
  const obrasRef = collection(db, "obras");

  await getUserObra();
  const q = query(obrasRef, where("nombreObra", "==", selectedObra));

  onSnapshot(q, (comprasArr) => {
    const items = [];
    comprasArr.forEach((doc) => items.push(doc.data()));
    if (items.length > 0) {
      callback(items[0].compras);
    }
  });
};

export const addItemToObra = async (item, obra) => {
  try {
    const docRef = doc(db, "obras", obra);
    await updateDoc(docRef, {
      compras: arrayUnion(item),
    });
  } catch (err) {
    console.log(err);
  }
};

// O B R A S

export const addNewObra = async (obra) => {
  try {
    const docRef = collection(db, "obras");
    const res = await addDoc(docRef, obra);
    const fileId = res.id;
    const updateDocId = doc(db, "obras", fileId);
    await updateDoc(updateDocId, { id: fileId });
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

export const getSingleObra = async (obra) => {
  const resObra = [];
  const docRef = collection(db, "obras");
  const q = query(docRef, where("nombreObra", "==", obra));
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => resObra.push(doc.data()));
  return resObra[0];
};

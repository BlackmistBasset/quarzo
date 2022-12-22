import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGID,
  appId: process.env.REACT_APP_APPID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

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
    const generalRef = doc(db, "obras", "XtnjdhaYtZNPBLnL2SL9");
    await updateDoc(generalRef, {
      compras: arrayUnion(item),
    });
  } catch (err) {
    console.log(err);
  }
};

export const editItem = async (obra, newItem) => {
  const docRef = doc(db, "obras", obra);
  const document = await getDoc(docRef);
  const compras = document.data().compras;
  let newComprasArray = compras.map((item) => {
    if (item.id === newItem.id) {
      return newItem;
    } else {
      return item;
    }
  });
  await updateDoc(docRef, {
    compras: newComprasArray,
  });
};

export const removeItem = async (nombreItem, obra) => {
  try {
    const docRef = doc(db, "obras", obra);
    const document = await getDoc(docRef);
    const compras = document.data().compras;
    let newComprasArray = compras.filter(
      (item) => item.nombreItem !== nombreItem
    );
    await updateDoc(docRef, {
      compras: newComprasArray,
    });
  } catch (err) {
    console.log(err);
  }
};

// I M A G E N E S

export const uploadReferenceImg = async (obraId, nombreItem, file) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${nombreItem}-ref.jpg`);
    const uploadRes = await uploadBytes(imgRef, file);
    console.log(uploadRes);
    return uploadRes;
  } catch (err) {
    console.log(err);
  }
};

export const getReferenceImg = async (obraId, nombreItem) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${nombreItem}-ref.jpg`);
    const url = await getDownloadURL(imgRef);
    return url;
  } catch (err) {
    console.log(err);
  }
};

export const uploadReceiptImg = async (obraId, nombreItem, file) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${nombreItem}-rec.jpg`);
    const uploadRes = await uploadBytes(imgRef, file);
    return uploadRes;
  } catch (err) {
    console.log(err);
  }
};

export const getReceiptImg = async (obraId, nombreItem) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${nombreItem}-rec.jpg`);
    const url = await getDownloadURL(imgRef);
    return url;
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

export const editObra = async (obraId, obraChanges) => {
  const docRef = doc(db, "obras", obraId);
  await updateDoc(docRef, {
    nombreObra: obraChanges.nombreObra,
    jefeDeObra: obraChanges.jefeDeObra,
  });
};

export const deleteObra = async (obraId) => {
  await deleteDoc(doc(db, "obras", obraId));
};

// U T I L I D A D E S
export const getJefesDeObra = async () => {
  const jefes = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const resDoc = doc.data();
    if (resDoc.userType === "jefeDeObra") jefes.push(resDoc.userName);
  });
  return jefes;
};

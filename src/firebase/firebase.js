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

    //General
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

  //General
  const generalRef = doc(db, "obras", "XtnjdhaYtZNPBLnL2SL9");
  const generalDocument = await getDoc(generalRef);
  let generalCompras = generalDocument.data().compras;
  let newGeneralComprasArray = generalCompras.map((item) => {
    if (item.id === newItem.id) {
      return newItem;
    } else {
      return item;
    }
  });
  await updateDoc(generalRef, {
    compras: newGeneralComprasArray,
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

    //General
    const generalRef = doc(db, "obras", "XtnjdhaYtZNPBLnL2SL9");
    const generalDocument = await getDoc(generalRef);
    let generalCompras = generalDocument.data().compras;
    let newGeneralComprasArray = generalCompras.filter(
      (item) => item.nombreItem !== nombreItem
    );
    await updateDoc(generalRef, {
      compras: newGeneralComprasArray,
    });
  } catch (err) {
    console.log(err);
  }
};

// I M A G E N E S

export const uploadReferenceImg = async (obraId, idItem, file) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${idItem}-ref.jpg`);
    const uploadRes = await uploadBytes(imgRef, file);
    console.log(uploadRes);
    return uploadRes;
  } catch (err) {
    console.log(err);
  }
};

export const getReferenceImg = async (obraId, idItem) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${idItem}-ref.jpg`);
    const url = await getDownloadURL(imgRef);
    return url;
  } catch (err) {
    console.log(err);
  }
};

export const uploadReceiptImg = async (obraId, idItem, file) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${idItem}-rec.jpg`);
    const uploadRes = await uploadBytes(imgRef, file);
    return uploadRes;
  } catch (err) {
    console.log(err);
  }
};

export const getReceiptImg = async (obraId, idItem) => {
  try {
    const imgRef = ref(storage, `images/${obraId}/${idItem}-rec.jpg`);
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

// C A J A   C H I C A

export const getJefesDeObraAndCajas = async () => {
  const jefesYCajas = [];
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const resDoc = doc.data();
    if (resDoc.userType === "jefeDeObra")
      jefesYCajas.push({
        jefeDeObra: resDoc.userName,
        montoCajaChica: resDoc.cajaChica,
        jefeId: resDoc.uid,
      });
  });
  return jefesYCajas;
};

export const getOneJefeMovimientos = async (jefe) => {
  let jefeSeleccionado;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const resDoc = doc.data();
    if (resDoc.userName === jefe) {
      jefeSeleccionado = resDoc;
    }
  });
  return jefeSeleccionado.movimientos;
};

export const getOneJefeCaja = async (jefe) => {
  let jefeSeleccionado;
  const querySnapshot = await getDocs(collection(db, "users"));
  querySnapshot.forEach((doc) => {
    const resDoc = doc.data();
    if (resDoc.userName === jefe) {
      jefeSeleccionado = resDoc;
    }
  });
  return jefeSeleccionado.cajaChica;
};

export const añadirSaldoAJefe = async (jefeId, monto) => {
  await updateDoc(doc(db, "users", jefeId), {
    cajaChica: monto,
  });
};

export const añadirMovimiento = async (jefeId, movimiento) => {
  await updateDoc(doc(db, "users", jefeId), {
    movimientos: arrayUnion(movimiento),
  });
};

export const restarMontoCaja = async (jefeId, montoCaja, montoMovimiento) => {
  await updateDoc(doc(db, "users", jefeId), {
    cajaChica: montoCaja - montoMovimiento,
  });
};

//N O T I F I C A C I O N E S

export const listenUserNotificacions = async (userId, callback) => {
  const userRef = doc(db, "users", userId);

  onSnapshot(userRef, (info) => {
    const userInfo = info.data();
    callback(userInfo.notificaciones);
  });
};

export const crearNotificacion = async (target, notificacion) => {
  const usersRef = collection(db, "users");
  const docsRef = await getDocs(usersRef);
  docsRef.forEach(async (user) => {
    const userData = user.data();
    if (target.includes(userData.userType)) {
      const notificacionesNuevas = [...userData.notificaciones, notificacion];

      await updateDoc(doc(db, "users", userData.uid), {
        notificaciones: notificacionesNuevas,
      });
    }
  });
};

export const marcarComoLeida = async (userId, notificacionId) => {
  const userRef = doc(db, "users", userId);
  const docRef = await getDoc(userRef);
  const notificaciones = docRef.data().notificaciones;
  let notificacionesUpdate = notificaciones.map((noti) => {
    if (noti.id === notificacionId) {
      let notiUpdated = { ...noti };
      notiUpdated.leida = true;
      return notiUpdated;
    } else {
      return noti;
    }
  });
  await updateDoc(userRef, {
    notificaciones: notificacionesUpdate,
  });
};

export const marcarTodasComoLeidas = async (userId) => {
  const userRef = doc(db, "users", userId);
  const docRef = await getDoc(userRef);
  const notificaciones = docRef.data().notificaciones;
  let notificacionesUpdate = notificaciones.map((noti) => {
    let notiUpdated = { ...noti };
    notiUpdated.leida = true;
    return notiUpdated;
  });
  await updateDoc(userRef, {
    notificaciones: notificacionesUpdate,
  });
};

export const borrarNotificacion = async (userId, notificacionId) => {
  const userRef = doc(db, "users", userId);
  const docRef = await getDoc(userRef);
  const notificaciones = docRef.data().notificaciones;

  const notificacionesUpdate = notificaciones.filter(
    (noti) => noti.id !== notificacionId
  );

  await updateDoc(userRef, {
    notificaciones: notificacionesUpdate,
  });
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

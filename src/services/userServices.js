import { db } from "../firebase/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export const getUsers = async () => {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const toggleProStatus = async (id, currentStatus) => {
  return updateDoc(doc(db, "users", id), {
    isPro: !currentStatus,
  });
};

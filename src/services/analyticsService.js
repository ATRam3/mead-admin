import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

export const getUsers = async () => {
  const snap = await getDocs(collection(db, "users"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const getPayments = async () => {
  const snap = await getDocs(collection(db, "payments"));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

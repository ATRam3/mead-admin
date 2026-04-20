import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const mealsRef = collection(db, "meals");

export const getMeals = async () => {
  const snap = await getDocs(mealsRef);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const addMeal = (data) => {
  return addDoc(mealsRef, data);
};

export const updateMeal = (id, data) => {
  return updateDoc(doc(db, "meals", id), data);
};

export const deleteMeal = (id) => {
  return deleteDoc(doc(db, "meals", id));
};

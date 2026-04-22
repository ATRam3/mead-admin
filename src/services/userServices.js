import { db } from "../firebase/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  query,
  limit,
  startAfter,
  endBefore,
  orderBy,
  getCountFromServer,
} from "firebase/firestore";
import { where } from "firebase/firestore";

const usersCollection = collection(db, "users");

// Get total user count (for pagination info)
export const getTotalUsersCount = async () => {
  const snapshot = await getCountFromServer(usersCollection);
  return snapshot.data().count;
};

// Fetch first page of users
export const getFirstPageUsers = async (pageSize = 30) => {
  const q = query(
    usersCollection,
    orderBy("createdAt", "desc"),
    limit(pageSize),
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const firstVisible = snapshot.docs[0];
  return { users, lastVisible, firstVisible };
};

// Fetch next page (after a specific document)
export const getNextPageUsers = async (lastDoc, pageSize = 30) => {
  const q = query(
    usersCollection,
    orderBy("createdAt", "desc"),
    startAfter(lastDoc),
    limit(pageSize),
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const firstVisible = snapshot.docs[0];
  return { users, lastVisible, firstVisible };
};

// Fetch previous page (before a specific document)
export const getPreviousPageUsers = async (firstDoc, pageSize = 30) => {
  const q = query(
    usersCollection,
    orderBy("createdAt", "desc"),
    endBefore(firstDoc),
    limit(pageSize),
  );
  const snapshot = await getDocs(q);
  const users = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const lastVisible = snapshot.docs[snapshot.docs.length - 1];
  const firstVisible = snapshot.docs[0];
  return { users, lastVisible, firstVisible };
};

export const searchUsers = async (searchTerm) => {
  const q = query(
    usersCollection,
    orderBy("name"),
    where("name", ">=", searchTerm),
    where("name", "<=", searchTerm + "\uf8ff"),
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Existing functions...
export const getUsers = async () => {
  const snap = await getDocs(usersCollection);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};

export const toggleProStatus = async (id, currentStatus) => {
  const userRef = doc(db, "users", id);
  return updateDoc(userRef, {
    isPro: !currentStatus,
  });
};

import { useEffect, useState } from "react";
import { getUsers } from "../services/userServices";

export const useUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
  }, []);

  return { users, setUsers };
};

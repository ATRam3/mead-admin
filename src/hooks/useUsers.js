import { useEffect, useState } from "react";
import { getUsers } from "../services/userServices";

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await getUsers();
    setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, setUsers, loading, refetch: fetchUsers };
};

import React from "react";
import { useUsers } from "../hooks/useUsers";

const Users = () => {
  const { users } = useUsers();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.isPro ? "Pro" : "Regular"}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Users;

import React from "react";
import { useSelector } from "react-redux";
import User from "./User";

const UsersList = () => {
  const users = useSelector((state) => state.usersReducer);
  // console.log(users);
  
  
  return (
    <div className="main-bar">
      <div className="main-bar-header">
          <h1>Users</h1>
      </div>
      <div className="user-list-container">
        {users.map((user) => (
          <User user={user} key={user?._id}></User>
        ))}
      </div>
    </div>

  );
};

export default UsersList;

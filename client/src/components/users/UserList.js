import React, { useEffect, useContext } from "react";
import UserItem from "./UserItem";
// import RegisterUserBtn from "../layout/RegisterUserBtn";
// import RegisterUserModal from "./RegisterUserModal";
import AuthContext from "../../context/auth/authContext";
// import DeleteUserModal from "./DeleteUserModal";
// import UpdateUserModal from "./UpdateUserModal";

const UserList = () => {
  const authContext = useContext(AuthContext);
  const { users, loading, getUsers } = authContext;

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  if (users !== null && users.length === 0 && !loading) {
    return <h4>No registered users in the database!</h4>;
  }

  return (
    <div>
      <h5>Registered Users</h5>
      {/* <RegisterUserModal /> */}
      <ul className="collection">
        {!loading &&
          users !== null &&
          users.map(user => <UserItem user={user} key={user._id} />)}
      </ul>
      {/* <RegisterUserBtn /> */}
      {/* <UpdateUserModal /> */}
      {/* <DeleteUserModal /> */}
    </div>
  );
};

export default UserList;

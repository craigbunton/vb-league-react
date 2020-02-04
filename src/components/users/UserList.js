import React, { useEffect, useContext } from "react";
import UserItem from "./UserItem";
import RegisterUserBtn from "../layout/RegisterUserBtn";
import RegisterUserModal from "../../components/users/RegisterUserModal";
import UserContext from "../../context/users/userContext";

const UserList = () => {
  const userContext = useContext(UserContext);
  const { users, loading, getUsers } = userContext;

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line
  }, []);

  if (users !== null && users.length === 0 && !loading) {
    return <h4>No registered users in the database!</h4>;
  }

  return (
    <div>
      <h4>Registered User List</h4>
      <RegisterUserBtn />
      <RegisterUserModal />
      <ul className="collection">
        {!loading &&
          users !== null &&
          users.map(user => <UserItem user={user} key={user.id} />)}
      </ul>
    </div>
  );
};

export default UserList;

import React from "react";

const UserItem = ({ user }) => {
  const { playerName, firstName, lastName } = user;
  return (
    <li className="collection-item grey lighten-4">
      <div>
        {playerName} : {firstName} {lastName}
      </div>
    </li>
  );
};

export default UserItem;

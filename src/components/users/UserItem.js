import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/users/userContext";

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const { playerName, firstName, lastName } = user;

  const onClick = e => {
    console.log(user);
    setCurrentUser(user);

    // console.log(user);
    // console.log(setCurrentUser);
  };

  return (
    <Fragment>
      <li className="collection-item">
        <a
          href="#update-user-modal"
          className="modal-trigger"
          onClick={onClick}
        >
          {playerName} : {firstName} {lastName}
        </a>
      </li>
    </Fragment>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;

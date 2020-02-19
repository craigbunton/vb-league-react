import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/users/userContext";

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);
  const { setCurrentUser } = userContext;

  const { playerName, firstName, lastName, active } = user;

  const onClick = e => {
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
          <span className={active ? "text-dark" : "text-primary"}>
            {playerName} : {firstName} {lastName}
          </span>
        </a>
      </li>
    </Fragment>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired
};

export default UserItem;

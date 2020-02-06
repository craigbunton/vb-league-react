import React, { Fragment, useState, useContext, useEffect } from "react";
import UserContext from "../../context/users/userContext";
//
//
const UpdateUserModal = () => {
  //
  const userContext = useContext(UserContext);
  const { current, updateUser, deleteUser, clearCurrentUser } = userContext;

  // const [newUser, setNewUser] = useState();

  useEffect(() => {
    setNewUser(current);
  }, [current]);

  // const [newUser, setNewUser] = useState();

  const [newUser, setNewUser] = useState(current);

  const { firstName, lastName, playerName, email, phone, active } = newUser;
  console.log(newUser);

  const onChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onUpdate = e => {
    updateUser(newUser);
    // clearCurrentUser();
  };
  const onDelete = () => {
    deleteUser(current.id);
    clearCurrentUser();
  };

  return (
    <Fragment>
      <div id="update-user-modal" className="modal" style={modalStyle}>
        <div className="modal-content">
          <h5>User Update/Delete</h5>

          <div className="row">
            <div className="input-field">
              <input
                type="text"
                name="playerName"
                value={playerName}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                placeholder="First Name"
                type="text"
                name="firstName"
                value={firstName}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                placeholder="Last Name"
                type="text"
                name="lastName"
                value={lastName}
                onChange={onChange}
              />{" "}
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                placeholder="Email address"
                type="email"
                name="email"
                value={email}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <input
                placeholder="Phone Number"
                type="text"
                name="phone"
                value={phone}
                onChange={onChange}
              />
            </div>
          </div>

          <div className="row">
            <div className="input-field">
              <p>
                <label>
                  <input
                    type="checkbox"
                    className="filled-in"
                    checked={active}
                    value={active}
                    onChange={() =>
                      setNewUser({ ...newUser, active: active ? false : true })
                    }
                  />
                  <span>Active User</span>
                </label>
              </p>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <a
            href="#!"
            onClick={onUpdate}
            className="modal-close waves-effect blue darken-2 waves-light btn"
          >
            Update
          </a>
          <a
            href="#!"
            onClick={onDelete}
            className="modal-close waves-effect blue darken-2 waves-light btn"
          >
            Delete
          </a>
        </div>
      </div>
    </Fragment>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%"
};

export default UpdateUserModal;

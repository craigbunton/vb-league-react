import React, { Fragment, useState, useContext, useEffect } from "react";
import AuthContext from "../../context/auth/authContext";
//
//
const UpdateUserModal = () => {
  //
  const authContext = useContext(AuthContext);
  const { current, updateUser, deleteUser, clearCurrentUser } = authContext;

  // const [newUser, setNewUser] = useState();

  useEffect(() => {
    setNewUser(current);
  }, [current]);

  // const [newUser, setNewUser] = useState();

  const [newUser, setNewUser] = useState(current);

  const { userName, firstName, lastName, email, phone, active } = newUser;

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
                name="userName"
                value={userName}
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

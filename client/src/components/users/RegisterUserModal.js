import React, { useState, useContext } from "react";
import UserContext from "../../context/users/userContext";
import M from "materialize-css/dist/js/materialize.min.js";

const RegisterUserModal = () => {
  //
  const userContext = useContext(UserContext);
  const { users, registerUser } = userContext;

  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    playerName: "",
    email: "",
    phone: "",
    password: "yellowave"
  });

  const [active, setActive] = useState(true);

  const { firstName, lastName, playerName, email, phone, password } = newUser;

  const onChange = e => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    //

    const matching = users.filter(
      user => user.playerName.toLowerCase() === playerName.toLowerCase()
    );

    if (playerName === "") {
      M.toast({ html: "Player Name is required to Register a new user" });
    } else if (matching.length > 0) {
      M.toast({ html: "Player Names must be unique. That name is taken." });
    } else {
      const newUserData = {
        firstName,
        lastName,
        playerName,
        email,
        phone,
        password,
        active
      };

      registerUser(newUserData);

      M.toast({ html: "New user Registered with password 'yellowave'" });

      // setNewUser(null);
    }
  };

  return (
    <div id="register-user-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h5>Add a new user</h5>

        <div className="row">
          <div className="input-field">
            <input
              placeholder="Player Name"
              type="text"
              name="playerName"
              value={playerName}
              onChange={onChange}
            />
            {/* <label htmlFor="playerName">Player Name</label> */}
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
            {/* <label htmlFor="firstName">First Name</label> */}
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
            {/* <label htmlFor="lastName">Last Name</label> */}
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
            />{" "}
            {/* <label htmlFor="email">Email Address</label> */}
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
            />{" "}
            {/* <label htmlFor="phone">Phone Number</label> */}
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
                  onChange={() => setActive(active ? false : true)}
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
          onClick={onSubmit}
          className="modal-close waves-effect blue darken-2 waves-light btn"
        >
          Enter
        </a>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%"
};

export default RegisterUserModal;

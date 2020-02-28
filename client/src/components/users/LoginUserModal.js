import React, { useState, useContext } from "react";
import AuthContext from "../../context/auth/authContext";
import M from "materialize-css/dist/js/materialize.min.js";

const LoginUserModal = props => {
  //
  const authContext = useContext(AuthContext);
  const { login } = authContext;

  // if (isAuthenticated) {
  //   props.history.push("/");
  // }

  const [user, setUser] = useState({
    userName: "",
    password: ""
  });

  const { userName, password } = user;

  const onChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    if (userName === "" || password === "") {
      M.toast({ html: "User Name and password are required to log in" });
    } else {
      console.log("Login User Modal user object: ", user);
      login(user);
      setUser({
        userName: "",
        password: ""
      });
    }
  };

  return (
    <div id="login-user-modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h5>Login</h5>

        <div className="row">
          <div className="input-field">
            <input
              placeholder="User Name"
              type="text"
              name="userName"
              value={userName}
              onChange={onChange}
            />
            {/* <label htmlFor="playerName">Player Name</label> */}
          </div>
        </div>

        <div className="row">
          <div className="input-field">
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={onChange}
            />
            {/* <label htmlFor="phone">Phone Number</label> */}
          </div>
        </div>

        <div className="modal-footer">
          <a
            href="#!"
            onClick={onSubmit}
            className="modal-close waves-effect blue darken-2 waves-light btn"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

const modalStyle = {
  width: "75%",
  height: "75%"
};

export default LoginUserModal;

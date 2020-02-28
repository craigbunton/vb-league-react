import React from "react";
import PropTypes from "prop-types";
import LoginUserModal from "../../components/users/LoginUserModal";
import RegisterUserModal from "../../components/users/RegisterUserModal";
const Navbar = ({ title, icon }) => {
  // const onLogout = () => {
  //   return;
  // };
  // const onLogin = () => {
  //   return;
  // };
  // const onRegister = () => {
  //   return;
  // };

  // const managerLinks = ()

  // const authLinks = (
  //   <Fragment>
  //     <li>
  //       <a onClick={onLogout} href="#!">
  //         <i className="fas fa-sign-out-alt" />{" "}
  //         <span className="hide-sm">Logout</span>
  //       </a>
  //     </li>
  //   </Fragment>
  // );

  return (
    <div className="navbar-fixed">
      <LoginUserModal />
      <RegisterUserModal />
      <nav>
        <div className="nav-wrapper">
          <i className="fas fa-volleyball-ball" />
          <h5 className="brand-logo" style={{ paddingLeft: "20px" }}>
            {" "}
            League Tracker
          </h5>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a className=" modal-trigger" href="#login-user-modal">
                <i className="fas fa-sign-in-alt" />{" "}
                <span className="hide-sm">Log In</span>
              </a>
            </li>
            <li>
              <a className=" modal-trigger" href="#register-user-modal">
                <i className="fas fa-sign-out-alt" />{" "}
                <span className="hide-sm">Register</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string
};

Navbar.defaultProps = {
  title: "League Tracker",
  icon: "fas fa-volleyball-ball"
};

export default Navbar;

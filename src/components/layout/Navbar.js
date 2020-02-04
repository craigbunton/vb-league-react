import React, { Fragment } from "react";
import PropTypes from "prop-types";

const Navbar = ({ title, icon }) => {
  // const onLogout = () => {
  //   return;
  // };
  const onLogin = () => {
    return;
  };
  const onRegister = () => {
    return;
  };

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
  const guestLinks = (
    <Fragment>
      <h3>
        {" "}
        <i className={icon} /> {title}
      </h3>
      <ul>
        <li>
          <a onClick={onLogin} href="#!">
            <i className="fas fa-user" />{" "}
            <span className="hide-sm">Profile</span>
          </a>
        </li>
        <li>
          <a onClick={onLogin} href="#!">
            <i className="fas fa-sign-in-alt" />{" "}
            <span className="hide-sm">Log In</span>
          </a>
        </li>{" "}
        <li>
          <a onClick={onRegister} href="#!">
            <i className="fas fa-sign-out-alt" />{" "}
            <span className="hide-sm">Log Out</span>
          </a>
        </li>
      </ul>
    </Fragment>
  );

  return <div className="navbar bg-primary container">{guestLinks}</div>;
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

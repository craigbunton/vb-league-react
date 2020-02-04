import React from "react";

const RegisterUserBtn = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#register-user-modal"
        className="btn-floating btn-large blue darken-2 modal-trigger"
      >
        <i className="large material-icons">add</i>
      </a>
    </div>
  );
};

export default RegisterUserBtn;

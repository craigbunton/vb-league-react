import React from "react";

const UpdateUserBtn = () => {
  return (
    <div className="fixed-action-btn">
      <a
        href="#register-user-modal"
        className="btn-floating btn-large blue darken-2 modal-trigger"
      >
        <i className="material-icons">edit</i>
      </a>
    </div>
  );
};

export default UpdateUserBtn;

import React, { useContext } from "react";
import AuthContext from "../../context/auth/authContext";

// import M from "materialize-css/dist/js/materialize.min.js";

const DeleteUserModal = user => {
  //
  const authContext = useContext(AuthContext);
  const { deleteUser } = authContext;
  const { userName, firstName, lastName, id } = user;

  const onDelete = () => {
    deleteUser(id);
  };

  return (
    <div id="#delete_user_modal" className="modal" style={modalStyle}>
      <div className="modal-content">
        <h6>
          `Are you sure you want to delete user ${userName} ${firstName} $
          {lastName}`
        </h6>
        <div>
          <a
            href="#!"
            className="btn-floating btn-large waves-effect waves-light green modal-close"
          >
            <i className="material-icons">cancel</i>
          </a>
          <a
            href="#!"
            className="btn-floating btn-large waves-effect waves-light red"
            onClick={onDelete}
          >
            <i className="material-icons">delete</i>
          </a>
        </div>{" "}
      </div>
    </div>
  );
};
const modalStyle = {
  width: "75%",
  height: "75%"
};

export default DeleteUserModal;

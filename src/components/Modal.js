import React from "react";
import "./Modal.css";

/*
    <Modal> this is the children </Modal>
*/

function Modal({ children }) {
  return (
    <div className="modal-container">
      <div className="modal-content">{children}</div>
    </div>
  );
}

export default Modal;

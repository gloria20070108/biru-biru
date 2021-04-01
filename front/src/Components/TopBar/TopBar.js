import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import "./css/TopBar.css";

export default function TopBar() {
  const [showModal, setModal] = useState(false);

  return (
    <div>
      <div>
        <Modal size="md" show={showModal} onHide={() => setModal(false)}>
          <Modal.Header>
            <Modal.Title>Signout</Modal.Title>
            <button
              type="button"
              className="btn-close"
              onClick={() => setModal(false)}
              aria-label="Close"
            ></button>
          </Modal.Header>
          <Modal.Body>
            <div className="signout-msg">
              Are you sure you want to sign out?
            </div>
            <form action="/signout" method="post">
              <button
                className="w-100 btn btn-lg btn-primary sign-out-btn"
                type="submit"
              >
                Sign out
              </button>
            </form>
          </Modal.Body>
        </Modal>
      </div>
      <header>
        <nav className="navbar navbar-expand-md navbar-light fixed-top">
          <div className="container-fluid">
            <span className="navbar-brand">BiruBiru~</span>
            <button
              className="btn btn-outline-success"
              onClick={() => setModal(true)}
            >
              Signout
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
}

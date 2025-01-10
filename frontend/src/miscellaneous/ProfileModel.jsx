import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ProfileModel = () => {
  const [smShow, setSmShow] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setSmShow(true)}> Small modal </Button>
      <Modal
        size="sm"
        show={smShow}
        onHide={() => setSmShow(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">
            Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>...</Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModel;

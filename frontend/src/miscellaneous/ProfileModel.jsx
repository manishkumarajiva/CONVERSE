import React from "react";
import Modal from "react-bootstrap/Modal";
import { Row, Col, Image } from "react-bootstrap";

const ProfileModel = ({ show, showHandler }) => {
  return (
    <React.Fragment>
      <Modal
        size="md"
        show={show}
        onHide={showHandler}
        centered
        animation={true}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-sm">Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center mb-3">
            <Image
              src="https://randomuser.me/api/portraits/men/81.jpg" // Example image
              roundedCircle
              height="100px"
              width="100px"
              className="border border-4 border-primary"
            />
          </div>

          <div className="text-center">
            <h3 className="mb-1">John Doe</h3>
            <p className="text-muted mb-2">Web Developer</p>
          </div>

          <Row>
            <Col>
              <p className="text-muted">Bio:</p>
              <p>
                Passionate about technology and coding. Enjoy solving complex
                problems with elegant solutions.
              </p>
            </Col>
          </Row>

          <Row>
            <Col>
              <p className="text-muted">Location:</p>
              <p>New York, USA</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default ProfileModel;

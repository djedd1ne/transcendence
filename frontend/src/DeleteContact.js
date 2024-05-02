import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DeleteContact = ({ contact, onDeleteConfirm, resetToContacts, children }) => {
  const [show, setShow] = useState(false);

  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };
  const handleClose = (event) => {
    // event.stopPropagation();
    setShow(false);
    // resetToContacts();  // Reset to contacts view when modal is closed
  };
  const handleDelete = (event) => {
    event.stopPropagation();
    onDeleteConfirm(contact.id);
    setShow(false);
  };

  return (
    <>
      <div onClick={handleShow}>
        {children}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Contact</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete {contact.name}? This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteContact;

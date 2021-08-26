import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Modal } from "react-bootstrap";

const UPDATE_STUDENT = gql`
  mutation updateStudent(
      $id: ID!,
      $name: String!,
      $email: String!,
      $phone: String!,
      $dob: String!) {
          updateStudent(
              id: $id,
              name: $name,
              email: $email,
              phone: $phone,
              dob: $dob) {
                  _id
        }
    }
`;

const EditStudent = ({ show, handleClose, _id, name, email, phone, dob }) => {
    const [sname, setSname] = useState(name);
    const [semail, setSmail] = useState(email);
    const [sphone, setSphone] = useState(phone);
    const [sdob, setSdob] = useState(dob);

    return (
        <div onClick={e => e.stopPropagation()}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Mutation mutation={UPDATE_STUDENT} onCompleted={() =>
                        window.location.reload()}>
                        {(updateStudent, { loading, error }) => (
                            <div className="container m-t-20">
                                <div className="m-t-20">
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            updateStudent({ variables: { id: _id, name: sname, email: semail, phone: sphone, dob: sdob } });
                                            handleClose();
                                            window.location.reload();
                                        }}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                // value={name}
                                                defaultValue={name}
                                                onChange={e => setSname(e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                defaultValue={email}
                                                onChange={
                                                    e => setSmail(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="Phone"
                                                defaultValue={phone}
                                                onChange={
                                                    e => setSphone(e.target.value)
                                                }
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="dob"
                                                placeholder="Date of Birth"
                                                defaultValue={dob}
                                                onChange={
                                                    e => setSdob(e.target.value)
                                                }
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary m-3">
                                            Save Changes
                                        </button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                            </div>)}
                    </Mutation >
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditStudent;
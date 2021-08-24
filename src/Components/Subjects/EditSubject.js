import React, { useState } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Modal } from "react-bootstrap";

const UPDATE_SUBJECT = gql`
  mutation updateSubject(
      $id: ID!,
      $name: String!) {
        updateSubject(
              id: $id,
              name: $name) {
                  _id
        }
    }
`;

const EditSubject = ({ show, handleClose, _id, name }) => {
    const [sname, setSname] = useState(name);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Update Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Mutation mutation={UPDATE_SUBJECT} onCompleted={() =>
                    window.location.reload()}>
                    {(updateStudent, { loading, error }) => (
                        <div className="container m-t-20">
                            <div className="m-t-20">
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        updateStudent({ variables: { id: _id, name: sname } });
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
                                            required
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
    )
}

export default EditSubject;
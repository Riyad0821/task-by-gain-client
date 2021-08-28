import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GET_SUBJECTS, UPDATE_SUBJECT } from "../Queries/Queries";
import { useMutation } from "@apollo/client";

const EditSubject = ({ show, handleClose, _id, name }) => {
    const [sname, setSname] = useState(name);
    const [updateSubject, { loading, error }] = useMutation(UPDATE_SUBJECT);


    return (
        <div onClick={e => e.stopPropagation()}>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Subject</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <div className="container m-t-20">
                            <div className="m-t-20">
                                <form
                                    onSubmit={e => {
                                        if (sname === name) {
                                            alert("No changes made");
                                            e.preventDefault();
                                        }
                                        else {
                                            e.preventDefault();
                                            updateSubject({
                                                variables: { id: _id, name: sname },
                                                refetchQueries: [{ query: GET_SUBJECTS }]
                                            });
                                            handleClose();
                                        }
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
                        </div>
                    }
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

export default EditSubject;
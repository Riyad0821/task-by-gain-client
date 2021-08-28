import React from "react";
import { useHistory } from "react-router-dom";
import { useInput } from "../Utils/Utils";
import { Button, Modal } from "react-bootstrap";
import { ADD_SUBJECT, GET_SUBJECTS } from "../Queries/Queries";
import { useMutation } from "@apollo/client";

const NewSubject = ({ show, handleClose }) => {
    const { value: name, bind: bindName, reset: resetName } = useInput("");
    const [addSubject, { data, loading, error }] = useMutation(ADD_SUBJECT);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {
                    <div className="container m-t-20">
                        <div className=" m-t-20">
                            <form
                                onSubmit={e => {
                                    e.preventDefault();
                                    addSubject({
                                        variables: { name: name },
                                        refetchQueries: [{ query: GET_SUBJECTS }]
                                    });
                                    resetName();
                                    handleClose();
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
                                        value={name}
                                        {...bindName}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary m-3">
                                    Create Subject
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
    );
};

export default NewSubject;
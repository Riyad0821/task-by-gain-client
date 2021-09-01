import { useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { Button, DropdownButton, Form, Modal, Dropdown } from "react-bootstrap";
import { GET_SUBJECTS, ASSIGN_SUBJECT, GET_STUDENTS } from "../Queries/Queries";

const AssignSubjects = ({ studentId }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data, loading, error } = useQuery(GET_SUBJECTS);
    const [addSubjectToStudent, { data: data1 }] = useMutation(ASSIGN_SUBJECT);

    return (
        <div onClick={e => e.stopPropagation()}>
            <Button variant="secondary" onClick={handleShow} >Assign Subject</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="m-t-20">
                        <form>
                            <div className="form-group">
                                <label>Subjects</label>
                                <DropdownButton id="dropdown-basic-button" title="Select Subject">
                                    {data && data.subjects.map(subject => (
                                        <Dropdown.Item onClick={
                                            () => {
                                                addSubjectToStudent({
                                                    variables: {
                                                        studentId,
                                                        subjectId: subject._id,
                                                    },
                                                    refetchQueries: [{ query: GET_STUDENTS }]
                                                });
                                                handleClose();
                                            }
                                        }>{subject.name}</Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div >
    );
};

export default AssignSubjects;
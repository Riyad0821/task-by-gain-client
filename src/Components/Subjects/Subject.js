import { Button, Col, Container, Row } from "react-bootstrap";
import React, { useState } from "react";
import EditSubject from "./EditSubject";
import RemoveSubject from "./RemoveSubject";

const studentList = (students) => {
    const studentList = students.map((student) => {
        return (
            <Container key={student._id}>
                <Row>
                    <Col><span>{student.name}</span></Col>
                </Row>
            </Container>
        );
    });
    return studentList;
};

const Student = ({ _id, name, students }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <tr>
                <td style={{ verticalAlign: "middle" }}> {name}</td>
                <td style={{ verticalAlign: "middle" }}>{studentList(students)}</td>
                <td style={{ verticalAlign: "middle" }}>
                    <Button variant="secondary" onClick={handleShow}>
                        Edit
                    </Button>
                    <EditSubject show={show} handleClose={handleClose} _id={_id} name={name} />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    <RemoveSubject _id={_id} />
                </td>
            </tr>
        </>
    );
};

export default Student;
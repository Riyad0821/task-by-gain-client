import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { DELETE_SUBJECT_FROM_STUDENT, GET_STUDENTS } from "../Queries/Queries";

const AssignSubjectList = ({ subject, studentId }) => {
    const [deleteSubjectFromStudent, { loading, error }] = useMutation(DELETE_SUBJECT_FROM_STUDENT);
    const handleDeleteSubjectFromStudent = () => {
        deleteSubjectFromStudent({
            variables: {
                studentId,
                subjectId: subject._id
            },
            refetchQueries: [
                {
                    query: GET_STUDENTS
                }
            ]
        });
    };
    return (
        <Container>
            <Row>
                <Col><span>{subject.name}</span></Col>
                <Col><Button variant="outline-danger" size="sm" className="m-1" onClick={handleDeleteSubjectFromStudent}>X</Button></Col>
                {loading && <p>Loading...</p>}
                {error && <p>Error :( Please try again</p>}
            </Row>
        </Container>
    );
};

export default AssignSubjectList;
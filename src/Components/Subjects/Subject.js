import { Button } from "react-bootstrap";
import React, { useState } from "react";
import EditSubject from "./EditSubject";
import RemoveSubject from "./RemoveSubject";

// const students = [{ id: 1, name: "John" }, { id: 2, name: "Mary" }];

const studentList = (students) => {
    const studentList = students.map((student) => {
        return (
            <li key={student.id}>
                {student.name}
            </li>
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
                <td> {name}</td>
                <td>{studentList(students)}</td>
                <td>
                    <Button variant="secondary" onClick={handleShow}>
                        Edit
                    </Button>
                    <EditSubject show={show} handleClose={handleClose} _id={_id} name={name} />
                </td>
                <td>
                    <RemoveSubject _id={_id} />
                </td>
            </tr>
        </>
    );
};

export default Student;
import { Button } from "react-bootstrap";
import React, { useState } from "react";
import EditStudent from "./EditStudent";
import RemoveStudent from "./RemoveStudent";

const Student = ({ student }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { _id, name, email, phone, dob } = student;

    return (
        <>
            <tr>
                <td> <p>{name}</p> </td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{dob}</td>
                <td>
                    <Button variant="secondary" onClick={handleShow}>
                        Edit
                    </Button>
                    <EditStudent show={show} handleClose={handleClose} _id={_id} name={name} email={email} phone={phone} dob={dob} />
                </td>
                <td>
                    <RemoveStudent _id={_id} />
                </td>
            </tr>
        </>
    );
};

export default Student;
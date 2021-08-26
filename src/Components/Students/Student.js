import { Button } from "react-bootstrap";
import gql from "graphql-tag";
import React, { useState } from "react";
import { Mutation } from "react-apollo";
import EditStudent from "./EditStudent";

const DELETE_STUDENT = gql`
mutation deleteStudent(
    $id: ID!){
        deleteStudent(
            id: $id){
                _id
            }
        }`;

const Student = ({ _id, name, email, phone, dob }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <Mutation mutation={DELETE_STUDENT} variables={{ id: _id }} onCompleted={() =>
                        window.location.reload()}>
                        {action => (
                            <button onClick={action} className="btn btn-danger">Delete</button>
                        )}
                    </Mutation>
                </td>
            </tr>
        </>
    );
};

export default Student;
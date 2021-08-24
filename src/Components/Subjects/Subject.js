import { Button } from 'react-bootstrap';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import EditSubject from './EditSubject';

const DELETE_SUBJECT = gql`
mutation deleteSubject(
    $id: ID!){
        deleteSubject(
            id: $id){
                _id
            }
        }`;

const Student = ({ _id, name }) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(_id);

    return (
        <>
            <tr>
                <td> <p>{name}</p> </td>
                <td>
                    <Button variant="secondary" onClick={handleShow}>
                        Edit
                    </Button>
                    <EditSubject show={show} handleClose={handleClose} _id={_id} name={name} />
                </td>
                <td>
                    <Mutation mutation={DELETE_SUBJECT} variables={{ id: _id }} onCompleted={() =>
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
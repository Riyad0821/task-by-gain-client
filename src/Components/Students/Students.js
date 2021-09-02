import React, { useState } from "react";
import Student from "./Student";
import NewStudent from "./NewStudent";
import { useQuery } from "@apollo/client";
import { GET_STUDENTS } from "../Queries/Queries";

const Students = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { loading, error, data } = useQuery(GET_STUDENTS);
    return (
        <div>
            <h4 className="text-center  m-3 text-success">Students</h4>
            <hr />
            <div className="flex">
                <button onClick={handleShow} className="btn btn-primary m-3">Add Student</button>
                <NewStudent handleClose={handleClose} show={show} />
            </div>
            {
                loading ? <h1>Loading...</h1> :
                    error ? <h1>Error</h1> :
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date of Birth</th>
                                    <th>Subjects</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.students.map(student =>
                                        <Student key={student._id} student={student} />
                                    )
                                }
                            </tbody>
                        </table>
            }
        </div >
    );
};

export default Students;
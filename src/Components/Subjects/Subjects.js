import React, { useState } from "react";
import NewSubject from "./NewSubject";
import Subject from "./Subject";
import { useQuery } from "@apollo/client";
import { GET_SUBJECTS } from "../Queries/Queries";

const Subjects = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { data, loading, error } = useQuery(GET_SUBJECTS);
    return (
        <div>
            <div>
                <button onClick={handleShow} className="btn btn-primary m-3">Add Subject</button>
                <NewSubject handleClose={handleClose} show={show} />
            </div>
            {
                loading ? <h1>Loading...</h1> :
                    error ? <h1>Error</h1> :
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Students</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.subjects.map(({ _id, name, students }) => (
                                    <Subject key={_id} _id={_id} name={name} students={students} />
                                ))}
                            </tbody>
                        </table>
            }
        </div >
    );
};

export default Subjects;
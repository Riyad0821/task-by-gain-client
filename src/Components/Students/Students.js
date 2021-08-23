import React, { useState } from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";
import Student from "./Student";
import NewStudent from './NewStudent';
// import { Mutation } from "react-apollo";

const allStudentsQuery = gql`
query{
    students{
      _id
      name
      email
      phone
      dob
    }
  }`

// const DEL_STUDENT = gql`
// mutation deleteStudent(
//     $id: ID!){
//         deleteStudent(
//             id: $id){
//                 _id
//             }
//         }`;


const Students = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div className="flex">
                {/* <a href="/newstudent" className="btn btn-primary m-3">Add Student</a> */}
                <button onClick={handleShow} className="btn btn-primary m-3">Add Student</button>
                <NewStudent handleClose={handleClose} show={show} />
            </div>
            <Query query={allStudentsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Date of Birth</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.students.map(({ _id, name, email, phone, dob }) => (
                                    <Student key={_id} _id={_id} name={name} email={email} phone={phone} dob={dob} />
                                ))}
                            </tbody>
                        </table>
                    );
                }}
            </Query>
        </div >
    );
};

export default Students;
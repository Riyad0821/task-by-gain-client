import React, { useState } from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import NewSubject from "./NewSubject";
import Subject from "./Subject";

const allSubjectsQuery = gql`
query{
    subjects{
      _id
      name
    }
  }`;

const Subjects = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div>
                <button onClick={handleShow} className="btn btn-primary m-3">Add Subject</button>
                <NewSubject handleClose={handleClose} show={show} />
            </div>
            <Query query={allSubjectsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return (
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.subjects.map(({ _id, name }) => (
                                    <Subject key={_id} _id={_id} name={name} />
                                ))}
                            </tbody>
                        </table>
                    );
                }}
            </Query>
        </div>
    );
};

export default Subjects;
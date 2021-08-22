import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const allStudentsQuery = gql`
query{
    students{
      name
      email
      phone
      dob
    }
  }`

const Students = () => {
    return (
        <div>
            <div>
                <a href="/newstudent">Add Student</a>
            </div>
            <Query query={allStudentsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return data.students.map(({ name, email, phone, dob }) => (
                        <div key={name}>
                            <p>{name}---{email}---{phone}---{dob} <a href="/editstudent">Edit Info</a> <button>Delete</button></p>
                        </div>
                    ));
                }}
            </Query>
        </div>
    );
};

export default Students;
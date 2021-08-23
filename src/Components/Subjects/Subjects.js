import React from 'react';
import { Query } from "react-apollo";
import gql from "graphql-tag";

const allSubjectsQuery = gql`
query{
    subjects{
      name
    }
  }`

const Subjects = () => {
    return (
        <div>
            <div>
                <a href="/newsubject">Add Subject</a>
            </div>
            <Query query={allSubjectsQuery}>
                {({ loading, error, data }) => {
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>Error :(</p>;
                    return data.subjects.map(({ name }) => (
                        <div key={name}>
                            <p>{name}</p>
                        </div>
                    ));
                }}
            </Query>
        </div>
    );
};

export default Subjects;
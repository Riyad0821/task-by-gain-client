import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { useHistory } from "react-router-dom";
import { useInput } from "../Utils/Utils";
import { useParams } from 'react-router-dom';


const GET_STUDENT = gql`
    query student($id: ID!) {
        student(id: $id) {
            _id
            name
            email
            phone
            dob
        }
    }
`;

const UPDATE_STUDENT = gql`
  mutation updateStudent(
      $id: ID!,
      $name: String!,
      $email: String!,
      $phone: String!,
      $dob: String!) {
          updateStudent(
              id: $id,
              name: $name,
              email: $email,
              phone: $phone,
              dob: $dob) {
                  _id
        }
    }
`;

const NewStudent = () => {
    const { value: name, bind: bindName, reset: resetName } = useInput("");
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
    const { value: phone, bind: bindPhone, reset: resetPhone } = useInput("");
    const { value: dob, bind: bindDob, reset: resetDob } = useInput("");

    const history = useHistory();

    const { id } = useParams();
    console.log(id);

    return (
        <Query query={GET_STUDENT} variables={{ id: id }}>
            {({ loading, error, data }) => {
                if (loading) return <div>Loading...</div>;
                if (error) return <div>{error.message}</div>;
                const { student } = data;
                const { name: studentName, email: studentEmail, phone: studentPhone, dob: studentDob } = student;

                return (
                    <Mutation mutation={UPDATE_STUDENT} onCompleted={() =>
                        history.push("/students")}>
                        {(updateStudent, { loading, error }) => (
                            <div className="container m-t-20">
                                <h1 className="">Update Student</h1>

                                <div className="m-t-20">
                                    <form
                                        onSubmit={e => {
                                            e.preventDefault();
                                            updateStudent({ variables: { id: id, name: name, email: email, phone: phone, dob: dob } });
                                            resetName();
                                            resetEmail();
                                            resetPhone();
                                            resetDob();
                                        }}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                defaultValue={studentName}
                                                value={name}
                                                {...bindName}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="email"
                                                placeholder="Email"
                                                defaultValue={studentEmail}
                                                value={email}
                                                {...bindEmail}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="Phone"
                                                defaultValue={studentPhone}
                                                value={phone}
                                                {...bindPhone}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="dob"
                                                placeholder="Date of Birth"
                                                defaultValue={studentDob}
                                                value={dob}
                                                {...bindDob}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Create Student
                                        </button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                            </div>)}
                    </Mutation >
                );
            }}
        </Query>
    );
};

export default React.forwardRef(NewStudent);

import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";

const CREATE_STUDENT = gql`
  mutation createStudent(
      $name: String!,
      $email: String!,
      $phone: String!,
      $dob: String!) {
          createStudent(
              name: $name,
              email: $email,
              phone: $phone,
              dob: $dob) {
                  _id
              }
      }
      `;

const NewStudent = () => {
    let name, email, phone, dob;
    return (
        <Mutation mutation={CREATE_STUDENT} onCompleted={() => useHistory.push('/')}>
            {(createStudent, { loading, error }) => (
                <div className="container m-t-20">
                    <h1 className="page-title">New Student</h1>

                    <div className="newnote-page m-t-20">
                        <form onSubmit={e => {
                            e.preventDefault();
                            createStudent({ variables: { name: name.value, email: email.value, phone: phone.value, dob: dob.value } });
                            name.value = "";
                            email.value = "";
                            phone.value = "";
                            dob.value = "";
                        }}>
                            <div className="field">
                                <label className="label">Name</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Name" name="name" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Email</label>
                                <div className="control">
                                    <input className="input" type="email" placeholder="Email" name="email" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Phone</label>
                                <div className="control">
                                    <input className="input" type="text" placeholder="Phone" name="phone" />
                                </div>
                            </div>

                            <div className="field">
                                <label className="label">Date of Birth</label>
                                <div className="control">
                                    <input className="input" type="datetime-local" placeholder="Date of Birth" name="dob" />
                                </div>
                            </div>

                            <div class="field">
                                <div class="control">
                                    <button type="submit" class="button">Submit</button>
                                </div>
                            </div>
                        </form>
                        {loading && <p>Loading...</p>}
                        {error && <p>Error :( Please try again</p>}
                    </div>
                </div>)}
        </Mutation>

    )
}

export default NewStudent;
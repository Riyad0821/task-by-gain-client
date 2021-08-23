import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { useInput } from "../Utils/Utils";

const CREATE_SUBJECT = gql`
  mutation addSubject(
      $name: String!){
          addSubject(
              name: $name){ 
                  _id
        }
    }
`;

const NewSubject = () => {
    const { value: name, bind: bindName, reset: resetName } = useInput("");

    const history = useHistory();

    return (
        <Mutation mutation={CREATE_SUBJECT} onCompleted={() =>
            history.push("/subjects")}>
            {(addSubject, { loading, error }) => (
                <div className="container m-t-20">
                    <h1 className="">New Subject</h1>
                    <div className=" m-t-20">
                        <form
                            onSubmit={e => {
                                e.preventDefault();
                                addSubject({ variables: { name: name } });
                                resetName();
                            }}
                        >
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Name"
                                    value={name}
                                    {...bindName}
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
    )
}

export default NewSubject;
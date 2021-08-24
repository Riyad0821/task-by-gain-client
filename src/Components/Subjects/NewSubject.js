import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useHistory } from "react-router-dom";
import { useInput } from "../Utils/Utils";
import { Button, Modal } from "react-bootstrap";

const CREATE_SUBJECT = gql`
  mutation addSubject(
      $name: String!){
          addSubject(
              name: $name){ 
                  _id
        }
    }
`;

const NewSubject = ({ show, handleClose }) => {
    const { value: name, bind: bindName, reset: resetName } = useInput("");

    const history = useHistory();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Subject</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Mutation mutation={CREATE_SUBJECT} onCompleted={() =>
                    history.push("/subjects")}>
                    {(addSubject, { loading, error }) => (
                        <div className="container m-t-20">
                            <div className=" m-t-20">
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addSubject({ variables: { name: name } });
                                        resetName();
                                        handleClose();
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

                                    <button type="submit" className="btn btn-primary m-3">
                                        Create Subject
                                    </button>
                                </form>
                                {loading && <p>Loading...</p>}
                                {error && <p>Error :( Please try again</p>}
                            </div>
                        </div>)}
                </Mutation >
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" className="" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default NewSubject;
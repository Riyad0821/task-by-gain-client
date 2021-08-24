import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";

const CREATE_STUDENT = gql`
  mutation addStudent(
      $name: String!,
      $email: String!,
      $phone: String!,
      $dob: String!) {
          addStudent(
              name: $name,
              email: $email,
              phone: $phone,
              dob: $dob) {
                  _id
        }
    }
`;

const NewStudent = ({ show, handleClose }) => {

    const { handleSubmit, register } = useForm();

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Mutation mutation={CREATE_STUDENT} onCompleted={() =>
                    window.location.reload()}>
                    {(addStudent, { loading, error }) => {

                        const onSubmit = (data) => {
                            addStudent({ variables: { name: data.name, email: data.email, phone: data.phone, dob: data.dob } });
                            console.log(data);
                            handleClose();
                        };

                        return (
                            <div className="container m-t-20">
                                <div className="m-t-20">
                                    <form
                                        onSubmit={handleSubmit(onSubmit)}
                                    >
                                        <div className="form-group">
                                            <label htmlFor="name">Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="name"
                                                placeholder="Name"
                                                required
                                                {...register("name")}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email"
                                                {...register("email",
                                                    {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                            message: "Invalid email address"
                                                        }

                                                    })}
                                            />
                                            <div className="text-secondary">Example: example101@gmail.com</div>
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="phone"
                                                placeholder="Phone"
                                                required
                                                {...register("phone",
                                                    {
                                                        required: "Phone is required",
                                                        pattern: {
                                                            value: /^(\+\d{1,2}\s?)?1?-?\.?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/i,
                                                            message: "Invalid Phone Number"
                                                        }

                                                    })}
                                            />
                                            <div className="text-secondary">Example: 18005551234, +86 800 555 1234</div>

                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="dob">Date of Birth</label>
                                            <input
                                                type="date"
                                                className="form-control"
                                                id="dob"
                                                placeholder="Date of Birth"
                                                required
                                                {...register("dob")}
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary m-3">
                                            Create Student
                                        </button>
                                    </form>
                                    {loading && <p>Loading...</p>}
                                    {error && <p>Error :( Please try again</p>}
                                </div>
                            </div>);
                    }}
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

export default NewStudent;
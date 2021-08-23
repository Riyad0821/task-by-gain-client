import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { useInput } from "../Utils/Utils";
import { Button, Modal } from "react-bootstrap";

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
    const { value: name, bind: bindName, reset: resetName } = useInput("");
    const { value: email, bind: bindEmail, reset: resetEmail } = useInput("");
    const { value: phone, bind: bindPhone, reset: resetPhone } = useInput("");
    const { value: dob, bind: bindDob, reset: resetDob } = useInput("");

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Student</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Mutation mutation={CREATE_STUDENT} onCompleted={() =>
                    window.location.reload()}>
                    {(addStudent, { loading, error }) => (
                        <div className="container m-t-20">
                            <div className="m-t-20">
                                <form
                                    onSubmit={e => {
                                        e.preventDefault();
                                        addStudent({ variables: { name: name, email: email, phone: phone, dob: dob } });
                                        resetName();
                                        resetEmail();
                                        resetPhone();
                                        resetDob();
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
                                            required
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
                                            value={email}
                                            required
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
                                            value={phone}
                                            required
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
                                            value={dob}
                                            required
                                            {...bindDob}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary m-3">
                                        Create Student
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



        // <Mutation mutation={CREATE_STUDENT} onCompleted={() =>
        //     history.push("/students")}>
        //     {(addStudent, { loading, error }) => (
        //         <div className="container m-t-20">
        //             <h1 className="page-title">New Student</h1>

        //             <div className="newnote-page m-t-20">
        //                 <form
        //                     onSubmit={e => {
        //                         e.preventDefault();
        //                         addStudent({ variables: { name: name, email: email, phone: phone, dob: dob } });
        //                         resetName();
        //                         resetEmail();
        //                         resetPhone();
        //                         resetDob();
        //                     }}
        //                 >
        //                     <div className="form-group">
        //                         <label htmlFor="name">Name</label>
        //                         <input
        //                             type="text"
        //                             className="form-control"
        //                             id="name"
        //                             placeholder="Name"
        //                             value={name}
        //                             {...bindName}
        //                         />
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="email">Email</label>
        //                         <input
        //                             type="text"
        //                             className="form-control"
        //                             id="email"
        //                             placeholder="Email"
        //                             value={email}
        //                             {...bindEmail}
        //                         />
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="phone">Phone</label>
        //                         <input
        //                             type="text"
        //                             className="form-control"
        //                             id="phone"
        //                             placeholder="Phone"
        //                             value={phone}
        //                             {...bindPhone}
        //                         />
        //                     </div>
        //                     <div className="form-group">
        //                         <label htmlFor="dob">Date of Birth</label>
        //                         <input
        //                             type="date"
        //                             className="form-control"
        //                             id="dob"
        //                             placeholder="Date of Birth"
        //                             value={dob}
        //                             {...bindDob}
        //                         />
        //                     </div>
        //                     <button type="submit" className="btn btn-primary m-3">
        //                         Create Student
        //                     </button>
        //                 </form>
        //                 {loading && <p>Loading...</p>}
        //                 {error && <p>Error :( Please try again</p>}
        //             </div>
        //         </div>)}
        // </Mutation >
    )
}

export default NewStudent;
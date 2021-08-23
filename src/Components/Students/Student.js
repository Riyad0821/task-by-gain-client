import { Button, Modal } from 'react-bootstrap';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

const DEL_STUDENT = gql`
mutation deleteStudent(
    $id: ID!){
        deleteStudent(
            id: $id){
                _id
            }
        }`;

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

const Student = ({ _id, name, email, phone, dob }) => {
    const [show, setShow] = useState(false);
    const [sname, setSname] = useState(name);
    const [semail, setSmail] = useState(email);
    const [sphone, setSphone] = useState(phone);
    const [sdob, setSdob] = useState(dob);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    console.log(name);

    return (
        <>
            <tr>
                <td> <p>{name}</p> </td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{dob}</td>
                <td>
                    <Button variant="primary" onClick={handleShow}>
                        Edit
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Update Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Mutation mutation={UPDATE_STUDENT} onCompleted={() =>
                                window.location.reload()}>
                                {(updateStudent, { loading, error }) => (
                                    <div className="container m-t-20">
                                        <div className="m-t-20">
                                            <form
                                                onSubmit={e => {
                                                    e.preventDefault();
                                                    updateStudent({ variables: { id: _id, name: sname, email: semail, phone: sphone, dob: sdob } });
                                                    handleClose();
                                                    window.location.reload();
                                                }}
                                            >
                                                <div className="form-group">
                                                    <label htmlFor="name">Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        placeholder="Name"
                                                        // value={name}
                                                        defaultValue={name}
                                                        onChange={e => setSname(e.target.value)}
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="email">Email</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="email"
                                                        placeholder="Email"
                                                        defaultValue={email}
                                                        onChange={
                                                            e => setSmail(e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="phone">Phone</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="phone"
                                                        placeholder="Phone"
                                                        defaultValue={phone}
                                                        onChange={
                                                            e => setSphone(e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="dob">Date of Birth</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="dob"
                                                        placeholder="Date of Birth"
                                                        defaultValue={dob}
                                                        onChange={
                                                            e => setSdob(e.target.value)
                                                        }
                                                    />
                                                </div>
                                                <button type="submit" className="btn btn-primary m-3">
                                                    Save Changes
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
                </td>
                <td>
                    <Mutation mutation={DEL_STUDENT} variables={{ id: _id }} onCompleted={() =>
                        window.location.reload()}>
                        {action => (
                            <button onClick={action} className="btn btn-danger">Delete</button>
                        )}
                    </Mutation>
                </td>
            </tr>
        </>



        // <div className="student">

        //     {/* <span className="p-3">{name}----{email}----{phone}----{dob}</span> */}
        //     {/* <a href={`/editstudent/${_id}`} className="btn btn-secondary m-3">Edit</a> */}
        //     <Button variant="secondary" onClick={handleShow}>
        //         Edit
        //     </Button>
        //     <Modal show={show} onHide={handleClose}>
        //         <Modal.Header closeButton>
        //             <Modal.Title>Update Student</Modal.Title>
        //         </Modal.Header>
        //         <Modal.Body>
        //             <Mutation mutation={UPDATE_STUDENT} onCompleted={() =>
        //                 history.push("/students")}>
        //                 {(updateStudent, { loading, error }) => (
        //                     <div className="container m-t-20">
        //                         <div className="m-t-20">
        //                             <form
        //                                 onSubmit={e => {
        //                                     e.preventDefault();
        //                                     updateStudent({ variables: { id: _id, name: sname, email: semail, phone: sphone, dob: sdob } });
        //                                     handleClose();
        //                                     window.location.reload();
        //                                 }}
        //                             >
        //                                 <div className="form-group">
        //                                     <label htmlFor="name">Name</label>
        //                                     <input
        //                                         type="text"
        //                                         className="form-control"
        //                                         id="name"
        //                                         placeholder="Name"
        //                                         // value={name}
        //                                         defaultValue={name}
        //                                         onChange={e => setSname(e.target.value)}
        //                                     />
        //                                 </div>
        //                                 <div className="form-group">
        //                                     <label htmlFor="email">Email</label>
        //                                     <input
        //                                         type="text"
        //                                         className="form-control"
        //                                         id="email"
        //                                         placeholder="Email"
        //                                         defaultValue={email}
        //                                         onChange={
        //                                             e => setSmail(e.target.value)
        //                                         }
        //                                     />
        //                                 </div>
        //                                 <div className="form-group">
        //                                     <label htmlFor="phone">Phone</label>
        //                                     <input
        //                                         type="text"
        //                                         className="form-control"
        //                                         id="phone"
        //                                         placeholder="Phone"
        //                                         defaultValue={phone}
        //                                         onChange={
        //                                             e => setSphone(e.target.value)
        //                                         }
        //                                     />
        //                                 </div>
        //                                 <div className="form-group">
        //                                     <label htmlFor="dob">Date of Birth</label>
        //                                     <input
        //                                         type="date"
        //                                         className="form-control"
        //                                         id="dob"
        //                                         placeholder="Date of Birth"
        //                                         defaultValue={dob}
        //                                         onChange={
        //                                             e => setSdob(e.target.value)
        //                                         }
        //                                     />
        //                                 </div>
        //                                 <button type="submit" className="btn btn-primary m-3">
        //                                     Save Changes
        //                                 </button>
        //                             </form>
        //                             {loading && <p>Loading...</p>}
        //                             {error && <p>Error :( Please try again</p>}
        //                         </div>
        //                     </div>)}
        //             </Mutation >
        //         </Modal.Body>
        //         <Modal.Footer>
        //             <Button variant="secondary" className="m-3" onClick={handleClose}>
        //                 Close
        //             </Button>
        //             {/* <Button variant="primary" className="m-3" onClick={handleClose}>
        //                 Save Changes
        //             </Button> */}
        //         </Modal.Footer>
        //     </Modal>
        //     <Mutation mutation={DEL_STUDENT} variables={{ id: _id }} onCompleted={() =>
        //         window.location.reload()}>
        //         {action => (
        //             <button onClick={action} className="btn btn-danger m-3">Delete</button>
        //         )}
        //     </Mutation>
        // </div>
    );
};

export default Student;
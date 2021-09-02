import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { GET_STUDENTS, UPDATE_STUDENT } from "../Queries/Queries";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";


const EditStudent = ({ _id, name, email, phone, dob }) => {
    // const [sname, setSname] = useState(name);
    // const [semail, setSmail] = useState(email);
    // const [sphone, setSphone] = useState(phone);
    // const [sdob, setSdob] = useState(dob);
    const [updateStudent, { loading, error }] = useMutation(UPDATE_STUDENT);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { handleSubmit, register, reset } = useForm();
    const onSubmit = (data) => {
        if (data.name === name && data.email === email && data.phone === phone && data.dob === dob) {
            alert("No changes made");
        }
        else {
            updateStudent({
                variables: { id: _id, name: data.name, email: data.email, phone: data.phone, dob: data.dob },
                refetchQueries: [{ query: GET_STUDENTS }]
            });
            handleClose();
        }
    };

    return (
        <div onClick={e => e.stopPropagation()}>
            <Button variant="secondary" onClick={handleShow}>
                Edit
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Student</Modal.Title>
                </Modal.Header>
                <Modal.Body>
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
                                        defaultValue={name}
                                        {...register("name")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Email"
                                        defaultValue={email}
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
                                        defaultValue={phone}
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
                                        defaultValue={dob}
                                        {...register("dob")}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary m-3">
                                    {loading ? "Updating..." : "Update"}
                                </button>
                            </form>
                            {/* <form
                                onSubmit={e => {
                                    if (sname === name && semail === email && sphone === phone && sdob === dob) {
                                        alert("No changes made");
                                        e.preventDefault();
                                    }
                                    else {
                                        e.preventDefault();
                                        updateStudent({
                                            variables: { id: _id, name: sname, email: semail, phone: sphone, dob: sdob },
                                            refetchQueries: [{ query: GET_STUDENTS }]
                                        });
                                        handleClose();
                                    }
                                }}
                            >
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="name"
                                        placeholder="Name"
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
                            </form> */}
                            {loading && <p>Loading...</p>}
                            {error && <p>Error :( Please try again</p>}
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" className="" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default EditStudent;
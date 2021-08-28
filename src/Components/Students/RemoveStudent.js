import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_STUDENT, GET_STUDENTS } from "../Queries/Queries";

const RemoveStudent = ({ _id }) => {
    const [removeStudent] = useMutation(DELETE_STUDENT);
    const handleRemoveStudent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeStudent({
            variables: {
                id: _id
            },
            optimisticResponse: true,
            update: (cache, { data: { deleteStudent } }) => {
                const { students } = cache.readQuery({ query: GET_STUDENTS });
                cache.writeQuery({
                    query: GET_STUDENTS,
                    data: { students: students.filter(student => student._id !== deleteStudent._id) }
                });
            }
        });
    };

    return (
        <button onClick={handleRemoveStudent} className="btn btn-danger"> Delete</button>
    );
};

export default RemoveStudent;
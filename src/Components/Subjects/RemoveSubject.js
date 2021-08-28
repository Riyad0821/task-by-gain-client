import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SUBJECT, GET_SUBJECTS } from "../Queries/Queries";

const RemoveSubject = ({ _id }) => {
    const [removeSubject] = useMutation(DELETE_SUBJECT);
    const handleRemoveSubject = (e) => {
        e.preventDefault();
        e.stopPropagation();
        removeSubject({
            variables: {
                id: _id
            },
            optimisticResponse: true,
            update: (cache, { data: { deleteSubject } }) => {
                const { subjects } = cache.readQuery({ query: GET_SUBJECTS });
                cache.writeQuery({
                    query: GET_SUBJECTS,
                    data: { subjects: subjects.filter(subject => subject._id !== deleteSubject._id) }
                });
            }
        });
    };

    return (
        <button onClick={handleRemoveSubject} className="btn btn-danger"> Delete</button>
    );
};

export default RemoveSubject;
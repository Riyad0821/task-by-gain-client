import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_SUBJECT, GET_SUBJECTS } from "../Queries/Queries";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faTrash } from "@fortawesome/free-solid-svg-icons";

const RemoveSubject = ({ _id }) => {
    const [removeSubject, { loading }] = useMutation(DELETE_SUBJECT);
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
        <button onClick={handleRemoveSubject} className="btn btn-danger" disabled={loading}>
            {loading ? <FontAwesomeIcon icon={faSpinner} /> : <FontAwesomeIcon icon={faTrash} />}
        </button>
    );
};

export default RemoveSubject;
import React from "react";
import EditStudent from "./EditStudent";
import RemoveStudent from "./RemoveStudent";
import AssignSubjects from "./AssignSubjects";
import AssignSubjectList from "./AssignSubjectList";

const Student = ({ student }) => {
    const { _id, name, email, phone, dob, subjects } = student;

    return (
        <>
            <tr>
                <td> <p>{name}</p> </td>
                <td>{email}</td>
                <td>{phone}</td>
                <td>{dob}</td>
                <td>{subjects.map((subject) => <AssignSubjectList key={subject._id} subject={subject} studentId={_id} ></AssignSubjectList>
                )}</td>
                <td>
                    <EditStudent _id={_id} name={name} email={email} phone={phone} dob={dob} />
                </td>
                <td>
                    <RemoveStudent _id={_id} />
                </td>
                <td>
                    <AssignSubjects studentId={_id} />
                </td>
            </tr>
        </>
    );
};

export default Student;
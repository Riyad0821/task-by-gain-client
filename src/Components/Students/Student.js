import React from "react";
import EditStudent from "./EditStudent";
import RemoveStudent from "./RemoveStudent";
import AssignSubjects from "./AssignSubjects";
import AssignedSubjectList from "./AssignedSubjectList";
import Moment from "react-moment";

const Student = ({ student }) => {
    const { _id, name, email, phone, dob, subjects } = student;

    return (
        <>
            <tr>
                <td style={{ verticalAlign: "middle" }}>{name}</td>
                <td style={{ verticalAlign: "middle" }}>{email}</td>
                <td style={{ verticalAlign: "middle" }}>{phone}</td>
                <td style={{ verticalAlign: "middle" }}><Moment format="DD.MM.YYYY">{dob}</Moment></td>
                <td style={{ verticalAlign: "middle" }}>{subjects.map((subject) => <AssignedSubjectList key={subject._id} subject={subject} studentId={_id} ></AssignedSubjectList>
                )}</td>
                <td style={{ verticalAlign: "middle" }}>
                    <EditStudent _id={_id} name={name} email={email} phone={phone} dob={dob} />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    <RemoveStudent _id={_id} />
                </td>
                <td style={{ verticalAlign: "middle" }}>
                    <AssignSubjects studentId={_id} />
                </td>
            </tr>
        </>
    );
};

export default Student;
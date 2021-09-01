import { useQuery } from "@apollo/client";
import React from "react";
import { Container } from "react-bootstrap";
import { Doughnut } from "react-chartjs-2";
import { GET_SUBJECTS } from "./Queries/Queries";

const Chart = () => {
    const { data: sData, loading, error } = useQuery(GET_SUBJECTS);
    console.log(sData);
    const data = {
        labels: sData && sData.subjects.map((subject) => subject.name),
        datasets: [
            {
                data: sData && sData.subjects.map((subject) => subject.students.length),
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                ],
                borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)",
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
        <Container>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Doughnut data={data} width={50}
                    height={25} />
            )}
        </Container>
    );
};

export default Chart;
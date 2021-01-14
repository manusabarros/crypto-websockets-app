import React, { useEffect, useRef } from "react";
import "./LineChart.scss";
import { Chart } from "chart.js";
import moment from "moment";
import Loading from "../loading/Loading";

const data = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const labels = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const LineChart = ({ id, values, variation, loading }: any) => {
    const lineChart = useRef<Chart | null>(null);

    useEffect(() => {
        lineChart.current = new Chart(id, {
            type: "line",
            data: {
                datasets: [
                    {
                        data,
                        backgroundColor: "#00FF0040",
                        lineTension: 0,
                        pointRadius: 0,
                    },
                ],
                labels,
            },
            options: {
                responsive: true,
                legend: { display: false },
                scales: {
                    xAxes: [{ display: false }],
                    yAxes: [{ display: false }],
                },
            },
        });
    }, []);

    useEffect(() => {
        if (lineChart.current && lineChart.current.data.datasets && lineChart.current.data.labels) {
            lineChart.current.data.datasets[0].data = values.map((value: number[]) => value[3]);
            lineChart.current.data.labels = values.map((value: number[]) => moment(value[0]).format("HH:mm:ss"));
            lineChart.current.update();
        }
    }, [values]);

    useEffect(() => {
        if (lineChart.current && lineChart.current.data.datasets) {
            lineChart.current.data.datasets[0].backgroundColor = variation < 0 ? "#FF000088" : "#00FF0040";
            lineChart.current.update();
        }
    }, [variation]);

    return (
        <div className="Chart">
            <p>24hs</p>
            {loading && <Loading />}
            <canvas id={id}></canvas>
        </div>
    );
};

export default LineChart;

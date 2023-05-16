import React from "react";
import { Line } from "react-chartjs-2";
import moment from "moment";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  
const LineGraph = ({schemeGraph}) => {
const label = []
const dataPoints = []
for(let i=0;i<schemeGraph.graphHistory.length; i++){
    label.push(moment(schemeGraph.graphHistory[i].navDate).format("D MMM, YY"))
}
for(let i=0;i<schemeGraph.graphHistory.length; i++){
    dataPoints.push(schemeGraph.graphHistory[i].navValue)
}
    const data = {
        labels: label,
        datasets: [
            {
                label: "₹",
                data: dataPoints,
                fill: false,
                borderColor: "rgba(75,192,192,1)",
            }
        ],
    };
    const option = {
        plugins: { 
            legend: {
                display: false,
            },
            tooltip:{
                displayColors: false
            }
        },
        scales: { 
            x: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false,
                    drawBorder: false,
                    color: 'rgba(217,143,7,0.1)',
                },
            },
            y: {
                ticks: {
                    display: false
                },
                grid: {
                    display: false,
                    drawBorder: false,
                    color: 'rgba(217,143,7,0.1)',
                },
            },
        },
        interaction: {
            intersect: false,
        },
    }
    return (
        <>
            <div className="App">
                <Line data={data} options={option} />
            </div>
        </>
    )
}

export default LineGraph
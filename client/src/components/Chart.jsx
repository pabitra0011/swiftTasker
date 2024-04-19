import React from "react";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
// import { chartData } from "../assets/data";



const Chart = ({ graphData }) => {
    return (
        <ResponsiveContainer
            width={"100%"}
            height={500}
        >
            <BarChart
                width={10}
                height={40}
                data={graphData}
            >
                <XAxis dataKey={"name"} />
                <YAxis dataKey={"total"} />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar
                    dataKey="total" fill="skyblue"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

export default Chart

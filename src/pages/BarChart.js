import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import Chart from "react-apexCharts";

export default function BarChart() {
  const [options, setOptions] = useState({
    chart: {
      id: "apexchart-example",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994],
    },
  });
  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 50, 60],
    },
  ]);
  //   const state = {
  //     labels: ["Nathi Birthday", "Naveen Birthday"],
  //     datasets: [
  //       {
  //         label: "EventsList",
  //         backgroundColor: "rgba(75, 192, 192, 1)",
  //         borderColor: "rgba(0, 0, 0, 1)",
  //         borderWidth: 2,
  //         data: [25000, 30000],
  //       },
  //     ],
  //   };

  //   const options = {
  //     plugins: {
  //       legend: {
  //         display: true,
  //         position: "bottom",
  //       },
  //       title: {
  //         text: "Average",
  //         display: true,
  //         fontSize: 20,
  //       },
  //     },
  //   };
  return (
    <div>
      {/* <Bar data={state} />
      <p style={{ textAlign: "center" }}>Bar Chart</p> */}
      <Chart
        options={options}
        series={series}
        type="bar"
        width={500}
        height={320}
      />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function Chart(props) {
  const [entries, setEntries] = useState();
  const [eventsList, setEventsList] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  };

  //   const labels = [
  //     "January",
  //     "February",
  //     "March",
  //     //   "April",
  //     //   "May",
  //     //   "June",
  //     //   "July",
  //   ];

  const data = {
    // labels: props.labels,
    labels: eventsList.map((singleEvent) => singleEvent.name),
    datasets: [
      {
        label: "Total Amount Received",
        data: props.data1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Total No. of Gifts Received",
        data: props.data2,
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const fetchAllEvents = () => {
    axios
      .get(`http://localhost:2010/events/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios.get("http://localhost:2010/entries").then((response) => {
      // console.log(response);
      console.log(response.data);
      setEntries(response.data);
    });
  };
  useEffect(() => {
    fetchAllEvents();
    fetchAllEntries();
  }, []);
  return (
    <>
      <div style={{ width: "1200px", margin: "auto auto" }}>
        <Bar options={options} data={data} />
      </div>
    </>
  );
}

export default Chart;

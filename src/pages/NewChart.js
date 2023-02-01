import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const NewChart = () => {
  const [data, setData] = useState({});
  const [eventsList, setEventsList] = useState([]);
  const [entries, setEntries] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("id");

  useEffect(() => {
    async function fetchData() {
      // fetch data from SQLite database
      //   const sqliteData = [{x: "Jan", y: 20}, {x: "Feb", y: 18}, ...];
      axios
        .get(`http://localhost:2023/events/all/${profileId}`)
        .then((response) => {
          // console.log(response);
          console.log(response.data);
          setEventsList(response.data);
        });

      // format data for chart.js
      const chartData = {
        // labels: sqliteData.map(d => d.x),
        labels: eventsList.map((singleEvent) => singleEvent.name),
        datasets: [
          //   {
          //     label: "Sales",
          //     //   data: sqliteData.map(d => d.y),
          //     data: eventsList.map((singleEvent) => singleEvent.totalAmount),
          //     backgroundColor: "rgba(75, 192, 192, 0.6)",
          //   },
        ],
      };

      setData(chartData);
    }

    fetchData();
  }, []);

  return (
    <div>
      <Bar data={data} />
    </div>
  );
};

export default NewChart;

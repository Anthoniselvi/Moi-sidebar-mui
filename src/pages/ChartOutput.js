// import "./App.css";
import Chart from "./Chart";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ChartOutput() {
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("id");
  const [data, setData] = useState([
    {
      //   labels: "Moi Amount",
      labels: eventsList.map((singleEvent) => singleEvent.name),
      // Event Map
      //   data: [{ values: [13, 14, 15] }, { values: [5, 10, 20] }],
      data: [{ values: [totalAmount] }, { values: [5, 10, 20] }],
    },
  ]);

  //   const getTotalAmount = (eventId) => {
  //     console.log(eventId);

  //     const totalAmount = entries
  //       .filter((entry) => entry.eventId === eventId)
  //       .map((entry) => parseInt(entry.amount))
  //       .reduce((acc, value) => acc + +value, 0);

  //     return totalAmount;
  //   };

  //   const gettotalGiftforEvent = (eventId) => {
  //     return entries.filter(
  //       (entry) => entry.eventId === eventId && entry.gift !== ""
  //     ).length;
  //   };
  //   useEffect(() => {
  //     fetch("http://localhost:3001/data", { method: "GET", redirect: "follow" })
  //       .then((res) => res.json())
  //       .then((json) => {
  //         console.log(json);
  //         setData(json);
  //       })
  //       .catch((err) => console.log(err));
  //   }, []);
  const fetchAllEvents = () => {
    axios
      .get(`http://localhost:2023/events/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setEventsList(response.data);
      });
  };

  const fetchAllEntries = () => {
    axios.get("http://localhost:2023/entries").then((response) => {
      // console.log(response);
      console.log(response.data);
      setEntries(response.data);
    });
  };

  const fetchTotalAmount = () => {
    axios
      .get(`http://localhost:2023/entries/total/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(response.data);
        setTotalAmount(response.data);
      });
  };

  useEffect(() => {
    fetchAllEvents();
    fetchAllEntries();
    fetchTotalAmount();
  }, []);

  return (
    <div className="App">
      <h1>Chart</h1>
      <Chart
        labels={data.length === 0 ? ["pink"] : data[0].labels}
        data1={data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[0].values}
        data2={data.length === 0 ? [0, 0, 0, 0, 0, 0] : data[0].data[1].values}
      />
      <button onClick={() => window.location.reload()}>Refresh Chart</button>
    </div>
  );
}

export default ChartOutput;

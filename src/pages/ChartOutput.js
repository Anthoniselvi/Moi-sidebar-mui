// import "./App.css";
import Chart from "./Chart";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function ChartOutput() {
  const [entries, setEntries] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [total, setTotal] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");

  const [data, setData] = useState([
    {
      //   labels: "Moi Amount",
      labels: eventsList.map((singleEvent) => singleEvent.name),
      // Event Map
      data: [{ values: [1500, 10000, 7000, 1000] }, { values: [1, 1, 1, 1] }],
      // data: [
      //   { values: total.map((singleTotal) => singleTotal.totalAmount) },
      //   { values: total.map((singleTotal) => singleTotal.totalGift) },
      // ],
    },
  ]);
  console.log("data : " + JSON.stringify(data));
  console.log(
    "event Name in data values : " +
      eventsList.map((singleEvent) => singleEvent.name)
  );

  const TotalMapArray = total.map((singleTotal) => singleTotal.totalAmount);
  console.log("TotalMapArray : " + JSON.stringify(TotalMapArray));
  console.log("Type of Array : " + typeof TotalMapArray);
  //  console.log(
  //     "totalAmount in data values : " +
  //       total.map((singleTotal) => singleTotal.totalAmount)
  //   )

  console.log(
    "totalGift in data values : " +
      total.map((singleTotal) => singleTotal.totalGift)
  );

  const fetchAllEvents = () => {
    axios
      .get(`http://localhost:2010/events/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(
          "eventslist recd in useEffect: " + JSON.stringify(response.data)
        );
        setEventsList(response.data);
      });
  };

  // const fetchAllEntries = () => {
  //   axios.get("http://localhost:2010/entries").then((response) => {
  //     // console.log(response);
  //     console.log(response.data);
  //     setEntries(response.data);
  //   });
  // };

  const fetchTotal = () => {
    axios
      .get(`http://localhost:2010/events/total/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(
          "total recd in useEffect : " + JSON.stringify(response.data)
        );
        setTotal(response.data);
      });
  };

  useEffect(() => {
    fetchAllEvents();
    // fetchAllEntries();
    fetchTotal();
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

import react from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Bar } from "react-chartjs-2";

export default function Chart() {
  const [eventsList, setEventsList] = useState([]);
  const [entries, setEntries] = useState([]);
  const [graph, setGraph] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("id");
  //   const [getdata, setGetData] = useState([]);

  //   const getEventsList = async () => {
  //     axios
  //       .get(`http://localhost:2023/events/all/${profileId}`)
  //       .then((response) => {
  //         // console.log(response);
  //         console.log(response.data);
  //         setEventsList(response.data);
  //       });
  //   };
  //     axios
  //       .get("http://localhost:3000/countries")

  //       .then((response) => {
  //         setGetData(response.data);
  //       });
  //   };
  //   useEffect(() => {
  //     getEventsList();
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
  useEffect(() => {
    fetchAllEvents();
    fetchAllEntries();
  }, []);

  const selectChart = (e) => {
    axios.get(`http://localhost:2023/events/all/${profileId}`).then((res) => {
      const eventData = res.data;
      let eventName = [];
      //   let budgetName = [];
      eventData.forEach((element) => {
        eventName.push(element.name);
        // budgetName.push(element.budget);
      });
      setGraph({
        labels: eventName,
        datasets: [
          {
            label: "In Billions Dollar",
            backgroundColor: [
              "green",
              "red",
              "blue",
              "#FFBF00",
              "#DE3163",
              "orange",
              "#40E0D0",
              "#6495ED",
              "#CCCCFF",
              "#FFBF00",
              "#DE3163",
              "#9FE2BF",
              "#CD5C5C",
            ],
            borderWidth: 0,
            // data: budgetName,
          },
        ],
      });
    });
  };
  useEffect(() => {
    selectChart();
  }, []);

  return (
    <div className="container">
      <h4 className="text-center text-primary mt-2 mb-3">
        EventsList Chart in ReactJS
      </h4>
      <h6 className="text-center text-success mt-2 mb-3">
        EventsList By Amount
      </h6>
      <div className="row mt-3">
        <div className="col-sm-3">
          <div className="">
            <table class=" table-bordered graphTable ">
              <tr>
                <th>Country</th>
                <th>Budget</th>
              </tr>
              {eventsList.map((singleEvent) => (
                <tr>
                  <td>{singleEvent.name}</td>
                  {/* <td>${singleEvent.budget}</td> */}
                </tr>
              ))}
            </table>
          </div>
        </div>
        <div className="col-sm-9">
          <Bar
            data={graph}
            options={{
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

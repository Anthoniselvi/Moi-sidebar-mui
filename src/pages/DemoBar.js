// import React, { useState, useEffect } from "react";
// import ReactDOM from "react-dom";
// import { Bar } from "@ant-design/plots";

// export default function DemoBar() {
//   const data = [
//     {
//       year: "1951 年",
//       value: 38,
//     },
//     {
//       year: "1952 年",
//       value: 52,
//     },
//     {
//       year: "1956 年",
//       value: 61,
//     },
//     {
//       year: "1957 年",
//       value: 145,
//     },
//     {
//       year: "1958 年",
//       value: 48,
//     },
//   ];
//   const config = {
//     data,
//     xField: "year",
//     yField: "value",
//     seriesField: "year",
//     legend: {
//       position: "top-left",
//     },
//   };
//   return <Bar {...config} />;
// }

// ReactDOM.render(<DemoBar />, document.getElementById("container"));

import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { Column } from "@ant-design/plots";
import axios from "axios";

export default function DemoBar() {
  const [data, setData] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  console.log("chart recd profileId : " + profileId);
  // const data = [
  //   {
  //     name: "London",
  //     月份: "Jan.",
  //     月均降雨量: 18.9,
  //   },
  // ];
  const config = {
    data,
    isGroup: true,
    xField: "name",
    yField: "totalAmount",
    seriesField: "name",

    label: {
      position: "middle",

      layout: [
        {
          type: "interval-adjust-position",
        },
        {
          type: "interval-hide-overlap",
        },
        {
          type: "adjust-color",
        },
      ],
    },
  };

  useEffect(() => {
    axios
      .get(`http://localhost:2010/events/total/all/${profileId}`)
      .then((response) => {
        // console.log(response);
        console.log(
          "total recd in useEffect : " + JSON.stringify(response.data)
        );
        setData(response.data);
        console.log("Recd Data in useEffect : " + JSON.stringify(data));
      });
  }, []);

  return (
    <div className="container">
      <Column {...config} />
    </div>
  );
}

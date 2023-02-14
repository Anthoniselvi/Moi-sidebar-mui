import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { Pie, G2 } from "@ant-design/plots";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import "./style.css";

export default function DemoPie() {
  const G = G2.getEngine("canvas");
  const [data, setData] = useState([]);
  const [searchParam] = useSearchParams();
  const profileId = searchParam.get("profile");
  console.log("chart recd profileId : " + profileId);
  // const data = [
  //   {
  //     type: "分类一",
  //     value: 27,
  //   },
  //   {
  //     type: "分类二",
  //     value: 25,
  //   },
  //   {
  //     type: "分类三",
  //     value: 18,
  //   },
  //   {
  //     type: "分类四",
  //     value: 15,
  //   },
  //   {
  //     type: "分类五",
  //     value: 10,
  //   },
  //   {
  //     type: "其他",
  //     value: 5,
  //   },
  // ];
  const config1 = {
    appendPadding: 10,
    data,
    angleField: "totalAmount",
    colorField: "name",
    radius: 0.9,
    label: {
      type: "inner",
      offset: "-30%",
      content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
      style: {
        fontSize: 14,
        textAlign: "center",
      },
    },
    interactions: [
      {
        type: "element-active",
      },
    ],
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "totalAmount",
    colorField: "name",
    radius: 0.75,
    legend: false,
    label: {
      type: "spider",
      labelHeight: 40,
      formatter: (data, mappingData) => {
        const group = new G.Group({});
        group.addShape({
          type: "circle",
          attrs: {
            x: 0,
            y: 0,
            width: 40,
            height: 50,
            r: 5,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 10,
            y: 8,
            text: `${data.name}`,
            fill: mappingData.color,
          },
        });
        group.addShape({
          type: "text",
          attrs: {
            x: 0,
            y: 25,
            text: `₹ ${data.totalAmount}个 ${(data.percent * 100).toFixed(0)}%`,
            fill: "rgba(0, 0, 0, 0.65)",
            fontWeight: 700,
          },
        });
        return group;
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
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
    <div className="pie_container">
      <Pie {...config1} className="pie_link" />
      <Pie {...config2} className="pie_link" />
    </div>
  );
}

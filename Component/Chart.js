import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

function Chart({ GeneratedJson }) {
  console.log("GeneratedJson");
  const data = {
    labels: Object.keys(GeneratedJson),
    datasets: [
      {
        label: "Profile Match",
        data: Object.values(GeneratedJson),
        backgroundColor: "#8338ec",
        borderColor: "white",
        borderWidth: 1,
      },
    ],
  };

  return <Radar data={data} />;
}

export default Chart;

import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

function PieChart({ data }) {
  const labels = Object.keys(data);
  const datasets = [
    {
      label: "Pie Chart",
      data: Object.values(data),
      backgroundColor: Object.keys(data).map((_, index) => getDefaultColors(index)),
    },
  ];

  return (
    <div>
      <Pie
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </div>
  );
}

function getDefaultColors(index) {
  const defaultColors = ["lightgreen", "blue", "red", "yellow", "green", "orange"];
  return defaultColors[index % defaultColors.length];
}

export default PieChart;

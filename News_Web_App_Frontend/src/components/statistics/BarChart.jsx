import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale, LinearScale, BarElement } from "chart.js";

Chart.register(CategoryScale, LinearScale, BarElement);

function BarChart({ data }) {
  const labels = Object.keys(data);
  const datasets = [
    {
      label: "Bar Chart",
      data: Object.values(data),
      backgroundColor: Object.keys(data).map((_, index) => getDefaultColors(index)),
    },
  ];

  return (
    <div>
      <Bar
        data={{
          labels: labels,
          datasets: datasets,
        }}
      />
    </div>
  );
}

function getDefaultColors(index) {
  const defaultColors = ["yellow", "skyblue", "orange", "red", "green", "purple"];
  return defaultColors[index % defaultColors.length];
}

export default BarChart;

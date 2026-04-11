import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, CategoryScale, ArcElement, Tooltip } from "chart.js";

Chart.register(ArcElement, CategoryScale, Tooltip);

function DonutChart({ data }) {
  const labels = Object.keys(data);
  const datasets = [
    {
      label: "Data Set 1",
      data: Object.values(data),
      backgroundColor: Object.keys(data).map((_, index) => getDefaultColors(index)),
    },
  ];

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return `${label}: ${value}`;
          },
        },
      },
    },
  };

  return (
    <div>
      <Doughnut
        data={{
          labels: labels,
          datasets: datasets,
        }}
        options={options}
      />
    </div>
  );
}

function getDefaultColors(index) {
  const defaultColors = ["yellow", "blue", "orange", "red", "green", "purple"];
  return defaultColors[index % defaultColors.length];
}

export default DonutChart;

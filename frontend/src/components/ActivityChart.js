import React, { useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Enregistrement des composants Chart.js nécessaires
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ActivityChart = ({ activities }) => {
  const chartRef = useRef(null);

  const data = {
    labels:
      activities?.map((activity) =>
        new Date(activity.date).toLocaleDateString()
      ) || [],
    datasets: [
      {
        label: "Distance (km)",
        data: activities?.map((activity) => activity.distance) || [],
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Progression des activités",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Distance (km)",
        },
      },
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
    },
  };

  return (
    <div className="w-full h-64 bg-white p-4 rounded-lg shadow">
      <Line ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default ActivityChart;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = [
  { day: "1", precision: 30, recall: 20},
  { day: "2", precision: 40, recall: 30},
  { day: "3", precision: 35, recall: 25},
  { day: "4", precision: 50, recall: 40},
  { day: "5", precision: 45, recall: 20},
];

const labels = data.map(entry => entry.day);
const precisionData = data.map(entry => entry.precision);
const recallData = data.map(entry => entry.recall);

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Precision',
      data: precisionData,
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      fill: false,
    },
    {
      label: 'Recall',
      data: recallData,
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 0.2)',
      fill: false,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
    },
    y: {
      beginAtZero: true,
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
    },
  },
};

const LineChart = () => {
  return (
    <div>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default LineChart;

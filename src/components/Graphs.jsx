import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const data = [
  { name: "Jan", precision: 30, recall: 20, fp: 50, fn: 40 },
  { name: "Feb", precision: 40, recall: 30, fp: 60, fn: 50 },
  { name: "Mar", precision: 35, recall: 25, fp: 55, fn: 45 },
  { name: "Apr", precision: 50, recall: 40, fp: 70, fn: 60 },
];

const labels = data.map(entry => entry.name);
const precisionData = data.map(entry => entry.precision);
const recallData = data.map(entry => entry.recall);
const fpData = data.map(entry => entry.fp);
const fnData = data.map(entry => entry.fn);

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
    {
      label: 'False Positives',
      data: fpData,
      borderColor: 'rgba(255, 159, 64, 1)',
      backgroundColor: 'rgba(255, 159, 64, 0.2)',
      fill: false,
    },
    {
      label: 'False Negatives',
      data: fnData,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
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
      position: 'bottom', // Ensure this is correctly placed under `plugins`
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

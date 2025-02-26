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
    title: {
      display: true,
      text: 'Precision and Recall',
    }, 
  },
};

const secondData = [
  { day: "2", falsePositive: 60, falseNegative: 40},
  { day: "1", falsePositive: 50, falseNegative: 30},
  { day: "3", falsePositive: 55, falseNegative: 35},
  { day: "4", falsePositive: 70, falseNegative: 50},
  { day: "5", falsePositive: 65, falseNegative: 45},
];

const secondLabels = secondData.map(entry => entry.day);
const accuracyData = secondData.map(entry => entry.falsePositive);
const f1ScoreData = secondData.map(entry => entry.falseNegative);

const secondChartData = {
  labels: secondLabels,
  datasets: [
    {
      label: 'False Positive',
      data: accuracyData,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 0.2)',
      fill: false,
    },
    {
      label: 'False Negative',
      data: f1ScoreData,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 0.2)',
      fill: false,
    },
  ],
};

const secondChartOptions = {
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
    title: {
      display: true,
      text: 'False Positive and False Negative',
    }
  },
};

const LineChart = () => {
  return (
    <div>
      <Line data={chartData} options={options} />
      <Line data={secondChartData} options={secondChartOptions} />
    </div>
  );
};

export default LineChart;
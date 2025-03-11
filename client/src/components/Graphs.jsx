import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Sample Data
const data = [
  { day: "1", precision: 20, recall: 66.6, f1: 30.7 },
  { day: "2", precision: 50, recall: 83.3, f1: 62.5 },
  { day: "3", precision: 20, recall: 66.6, f1: 30.7 },
  { day: "4", precision: 50, recall: 83.3, f1: 62.5 },
  { day: "5", precision: 20, recall: 100, f1: 33 },
];

const labels = data.map(entry => entry.day);
const precisionData = data.map(entry => entry.precision);
const recallData = data.map(entry => entry.recall);
const f1ScoreData = data.map(entry => (2 * entry.precision * entry.recall) / (entry.precision + entry.recall));

const chartData = {
  labels: labels,
  datasets: [
    {
      label: 'Precision',
      data: precisionData,
      borderColor: '#DDFF61',
      backgroundColor: '#DDFF61',
      fill: true,
    },
    {
      label: 'Recall',
      data: recallData,
      borderColor: '#9748FF',
      backgroundColor: '#9748FF',
      fill: true,
    },
    {
      label: 'F1 Score',
      data: f1ScoreData,
      borderColor: '#4F51FF',
      backgroundColor: '#4F51FF',
      fill: true,
    },
  ],
};

const options = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
        borderColor: 'white', // Set x-axis line color to white
      },
      ticks: {
        color: 'white',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
        borderColor: 'white', // Set y-axis line color to white
      },
      ticks: {
        color: 'white',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'white',
      },
    },
    title: {
      display: true,
      text: 'Precision, Recall and F1 Score',
      color: 'white',
    },
  },
};

// Second Chart Data
const secondData = [
  { day: "1", falsePositive: 1, falseNegative: 5 },
  { day: "2", falsePositive: 1, falseNegative: 5 },
  { day: "3", falsePositive: 1, falseNegative: 8 },
  { day: "4", falsePositive: 1, falseNegative: 5 },
  { day: "5", falsePositive: 0, falseNegative: 8 },
];

const secondLabels = secondData.map(entry => entry.day);
const falsePositiveData = secondData.map(entry => entry.falsePositive);
const falseNegativeData = secondData.map(entry => entry.falseNegative);

const secondChartData = {
  labels: secondLabels,
  datasets: [
    {
      label: 'False Positive',
      data: falsePositiveData,
      borderColor: '#DDFF61',
      backgroundColor: '#DDFF61',
      fill: true,
    },
    {
      label: 'False Negative',
      data: falseNegativeData,
      borderColor: '#4F51FF',
      backgroundColor: '#4F51FF',
      fill: true,
    },
  ],
};

const secondChartOptions = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
        borderColor: 'white', // Set x-axis line color to white
      },
      ticks: {
        color: 'white',
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
        borderColor: 'white', // Set y-axis line color to white
      },
      ticks: {
        color: 'white',
      },
    },
  },
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'white',
      },
    },
    title: {
      display: true,
      text: 'False Positive and False Negative',
      color: 'white',
    },
  },
};

// Chart Component
const LineChart = () => {
  return (
    <div>
      <Line data={chartData} options={options} className="firstchart" />
      <div></div>
      <Line data={secondChartData} options={secondChartOptions} className="secondchart" />
    </div>
  );
};

export default LineChart;

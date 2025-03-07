import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

//prec = tp/(tp+fp)
//recall = tp/(tp+fn)
//f1 = (2*prec*recall)/(prec+recall)

//fpr = fp/(fp+tn)
//fnr = fn/(fn+tp)

const data = [
  { day: "1", precision: 20, recall: 66.6, f1: 30.7},
  { day: "2", precision: 50, recall: 83.3, f1: 62.5},
  { day: "3", precision: 20, recall: 66.6, f1: 30.7},
  { day: "4", precision: 50, recall: 83.3, f1: 62.5},
  { day: "5", precision: 20, recall: 100, f1: 33},
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
      borderColor: 'rgba(75, 192, 192, 1)',
      backgroundColor: 'rgba(75, 192, 192, 1)',
      fill: true,
    },
    {
      label: 'Recall',
      data: recallData,
      borderColor: 'rgba(153, 102, 255, 1)',
      backgroundColor: 'rgba(153, 102, 255, 1)',
      fill: true,
    },
    {
      label: 'F1 Score',
      data: f1ScoreData,
      borderColor: 'rgba(255, 206, 86, 1)',
      backgroundColor: 'rgba(255, 206, 86, 1)',
      fill: true,
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
      text: 'Precision, Recall and F1 Score',
    }, 
  },
};

const secondData = [
  { day: "1", falsePositive: 1, falseNegative: 5},
  { day: "2", falsePositive: 1, falseNegative: 5},
  { day: "3", falsePositive: 1, falseNegative: 8},
  { day: "4", falsePositive: 1, falseNegative: 5},
  { day: "5", falsePositive: 0, falseNegative: 8},
];

const secondLabels = secondData.map(entry => entry.day);
const falsePositiveData = secondData.map(entry => entry.falsePositive);
const falseNegativeData = secondData.map(entry => entry.falseNegative);
// const f1ScoreData = secondData.map(entry => entry.falseNegative);

const secondChartData = {
  labels: secondLabels,
  datasets: [
    {
      label: 'False Positive',
      data: falsePositiveData,
      borderColor: 'rgba(255, 99, 132, 1)',
      backgroundColor: 'rgba(255, 99, 132, 1)',
      fill: true,
    },
    {
      label: 'False Negative',
      data: falseNegativeData,
      borderColor: 'rgba(54, 162, 235, 1)',
      backgroundColor: 'rgba(54, 162, 235, 1)',
      fill: true,
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
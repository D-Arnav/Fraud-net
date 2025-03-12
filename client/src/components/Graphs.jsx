import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const dayWiseResults = [
  { "day": "Jan 15", "precision": 0.06, "recall": 0.52, "f1_score": 0.11, "false_positives": 119, "false_negatives": 1933 },
  { "day": "Jan 16", "precision": 0.07, "recall": 0.58, "f1_score": 0.13, "false_positives": 94, "false_negatives": 1654 },
  { "day": "Jan 17", "precision": 0.06, "recall": 0.61, "f1_score": 0.11, "false_positives": 72, "false_negatives": 1753 },
  { "day": "Jan 18", "precision": 0.06, "recall": 0.55, "f1_score": 0.11, "false_positives": 91, "false_negatives": 1668 },
  { "day": "Jan 19", "precision": 0.07, "recall": 0.57, "f1_score": 0.13, "false_positives": 88, "false_negatives": 1508 },
  { "day": "Jan 20", "precision": 0.06, "recall": 0.51, "f1_score": 0.11, "false_positives": 98, "false_negatives": 1581 },
  { "day": "Jan 21", "precision": 0.06, "recall": 0.57, "f1_score": 0.11, "false_positives": 69, "false_negatives": 1377 },
  { "day": "Jan 22", "precision": 0.07, "recall": 0.49, "f1_score": 0.12, "false_positives": 101, "false_negatives": 1401 },
  { "day": "Jan 23", "precision": 0.07, "recall": 0.56, "f1_score": 0.13, "false_positives": 93, "false_negatives": 1570 },
  { "day": "Jan 24", "precision": 0.07, "recall": 0.59, "f1_score": 0.12, "false_positives": 90, "false_negatives": 1805 },
  { "day": "Jan 25", "precision": 0.06, "recall": 0.58, "f1_score": 0.11, "false_positives": 89, "false_negatives": 1919 },
  { "day": "Jan 26", "precision": 0.07, "recall": 0.59, "f1_score": 0.12, "false_positives": 88, "false_negatives": 1725 },
  { "day": "Jan 27", "precision": 0.07, "recall": 0.62, "f1_score": 0.13, "false_positives": 82, "false_negatives": 1750 },
  { "day": "Jan 28", "precision": 0.08, "recall": 0.64, "f1_score": 0.14, "false_positives": 96, "false_negatives": 2114 },
  { "day": "Jan 29", "precision": 0.07, "recall": 0.66, "f1_score": 0.13, "false_positives": 80, "false_negatives": 2030 },
  { "day": "Jan 30", "precision": 0.07, "recall": 0.59, "f1_score": 0.13, "false_positives": 107, "false_negatives": 1939 }
]

const baseOptions = {
  responsive: true,
  scales: {
    x: {
      beginAtZero: true,
      grid: {
        display: false,
        borderColor: 'white',
      },
      ticks: {
        color: 'white',
        font: {
          size: 11,
        },
      },
      offset: true,
      title: {
        display: true,
        text: 'Date',
        color: 'white',
        font: {
          size: 16,
        },
      },
    },
    y: {
      beginAtZero: true,
      grid: {
        display: false,
        borderColor: 'white',
      },
      ticks: {
        color: 'white',
        font: {
          size: 14, // Increase Y-axis text size
        },
      },
      title: {
        display: true,
        color: 'white',
        font: {
          size: 16, // Increase Y-axis title text size
        },
      },
    },
  },
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'white',
        font: {
          size: 14, // Increase legend text size
        },
      },
    },
    title: {
      display: true,
      color: 'white',
      font: {
        size: 18, // Increase chart title text size
      },
    },
  },
};

const scoreOptions = {
  ...baseOptions,
  scales: {
    ...baseOptions.scales,
    y: {
      ...baseOptions.scales.y,
      title: {
        ...baseOptions.scales.y.title,
        text: 'Score', // Y-axis label for the first chart
      },
    },
  },
  plugins: {
    ...baseOptions.plugins,
    title: {
      ...baseOptions.plugins.title,
      text: 'Precision, Recall and F1 Score',
    },
  },
};

const falsePositiveOptions = {
  ...baseOptions,
  scales: {
    ...baseOptions.scales,
    y: {
      ...baseOptions.scales.y,
      title: {
        ...baseOptions.scales.y.title,
        text: 'Number of Transactions', // Y-axis label for the second chart
      },
    },
  },
  plugins: {
    ...baseOptions.plugins,
    title: {
      ...baseOptions.plugins.title,
      text: 'False Negatives Over Days (Fraudulent Transactions Incorrectly Flagged as Legitimate)',
    },
  },
};

const falseNegativeOptions = {
  ...baseOptions,
  scales: {
    ...baseOptions.scales,
    y: {
      ...baseOptions.scales.y,
      title: {
        ...baseOptions.scales.y.title,
        text: 'Number of Transactions', // Y-axis label for the third chart
      },
    },
  },
  plugins: {
    ...baseOptions.plugins,
    title: {
      ...baseOptions.plugins.title,
      text: 'False Positives Over Days (Legitimate Transactions Incorrectly Flagged as Fraud)',
    },
  },
};


const scoreChart = {
  labels: dayWiseResults.map(entry => entry.day),
  datasets: [
    {
      label: 'Precision',
      data: dayWiseResults.map(entry => entry.precision),
      borderColor: '#DDFF61',
      backgroundColor: '#DDFF61',
      fill: true,
    },
    {
      label: 'Recall',
      data: dayWiseResults.map(entry => entry.recall),
      borderColor: '#9748FF',
      backgroundColor: '#9748FF',
      fill: true,
    },
    {
      label: 'F1 Score',
      data: dayWiseResults.map(entry => entry.f1_score),
      borderColor: '#4F51FF',
      backgroundColor: '#4F51FF',
      fill: true,
    },
  ],
};

// Split errorRateChart into two separate charts
const falsePositiveChart = {
  labels: dayWiseResults.map(entry => entry.day),
  datasets: [{
    label: 'False Negative',
    data: dayWiseResults.map(entry => entry.false_positives),
    borderColor: '#DDFF61',
    backgroundColor: '#DDFF61',
    fill: true,
  }],
};

const falseNegativeChart = {
  labels: dayWiseResults.map(entry => entry.day),
  datasets: [{
    label: 'False Positive',
    data: dayWiseResults.map(entry => entry.false_negatives),
    borderColor: '#4F51FF',
    backgroundColor: '#4F51FF',
    fill: true,
  }],
};

const LineChart = () => {
  return (
    <div style={{ width: '80%', margin: '0 auto' }}>
      <Line data={scoreChart} options={scoreOptions} />
      <br /> <br />
      <Line data={falsePositiveChart} options={falsePositiveOptions} />
      <br /> <br /> 
      <Line data={falseNegativeChart} options={falseNegativeOptions} />
    </div>
  );
};

export default LineChart;
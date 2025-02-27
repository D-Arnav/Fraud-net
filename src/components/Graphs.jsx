import React, {useContext} from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { AppContext } from '../hooks/AppContext';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
  
  const { metrics } = useContext(AppContext);
  
  const labels = metrics.map(entry => entry.day);

  const precisionData = metrics.map(entry => entry.precision);
  const recallData = metrics.map(entry => entry.recall);
  const f1ScoreData = metrics.map(entry => entry.f1);
  const fprData = metrics.map(entry => entry.fpr);
  const fnrData = metrics.map(entry => entry.fnr);
  // const fnrData = metrics.map(entry => entry.fpr);


  const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Precision',
        data: precisionData,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Recall',
        data: recallData,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        fill: true,
      },
      {
        label: 'F1 Score',
        data: f1ScoreData,
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
      },
    ],
  };

  const secondChartData = {
    labels: labels,
    datasets: [
      {
        label: 'False Positive',
        data: fprData,
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'False Negative',
        data: fnrData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        fill: true,
      },
    ],
  };

  
  
  return (
    <div>
      <div>
        <h2>Metrics</h2>
        <pre>{JSON.stringify(metrics, null, 2)}</pre>
      </div>
      <Line data={chartData} options={options} />
      <Line data={secondChartData} options={secondChartOptions} />
    </div>
  );
};

export default LineChart;
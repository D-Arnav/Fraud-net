import React, { useState, useEffect } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Jan", precision: 30, recall: 20, fp: 50, fn: 40 },
  { name: "Feb", precision: 40, recall: 30, fp: 60, fn: 50 },
  { name: "Mar", precision: 35, recall: 25, fp: 55, fn: 45 },
  { name: "Apr", precision: 50, recall: 40, fp: 70, fn: 60 },
];

const Graph = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="linear"
          dataKey="precision"
          stroke="#8884d8"
          strokeWidth={2}
        />
        <Line
          type="linear"
          dataKey="recall"
          stroke="#82ca9d"
          strokeWidth={2}
        />
        <Line
          type="linear"
          dataKey="fp"
          stroke="#ffc658"
          strokeWidth={2}
        />
        <Line
          type="linear"
          dataKey="fn"
          stroke="#ff7300"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default Graph;

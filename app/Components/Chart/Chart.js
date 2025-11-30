"use client";
import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Area
} from 'recharts';
import './Chart.css';

const data = [
  { date: 'JAN', value1: 3000, value2: 4000 },
  { date: 'FEB', value1: 2000, value2: 3000 },
  { date: 'MAR', value1: 2500, value2: 2700 },
  { date: 'APR', value1: 3500, value2: 3600 },
  { date: 'MAY', value1: 1000, value2: 1500 },
  { date: 'JUN', value1: 1200, value2: 2900 },
  { date: 'JUL', value1: 2100, value2: 2700 },
  { date: 'AUG', value1: 1100, value2: 1700 },
  { date: 'SEP', value1: 1100, value2: 1700 },
  { date: 'OCT', value1: 1100, value2: 1700 },
  { date: 'NOV', value1: 1100, value2: 1700 },
  { date: 'DEC', value1: 1100, value2: 1700 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <span>{` ${payload[0].value.toLocaleString()}`}</span>
      </div>
    );
  }
  return null;
};

const Chart = () => {
  const [activeTab, setActiveTab] = useState('Annually');
  const tabs = ['Daily', 'Weekly', 'Annually'];

  return (
    <div
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      className="chart-container rounded mt-8  bg-background2"
    >
      <div className="flex flex-row items-center mb-5  gap-4 justify-between">
        <div className="tab-buttons bg-glass py-2 px-4 rounded ">
          {tabs.map(tab => (
            <button
              key={tab}
              className={`tab-button h-max text-[0.7rem] text-white ${activeTab === tab ? '!bg-background2 text-white' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <h3 className="text-[1.2rem] text-white font-semibold">Project Overview</h3>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="1 1" vertical={false} stroke="rgba(255,255,255,0.2)" />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ dy: 10, fontSize: "14px", fill: "#fff" }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tickFormatter={(value) => `${value / 1000} K`}
            tick={{ dx: -50, fontSize: "14px", fill: "#fff" }}
          />

          <Tooltip content={<CustomTooltip />} />

          <defs>
            <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#00CFFF" stopOpacity={0.5} />
              <stop offset="95%" stopColor="#001B44" stopOpacity={0} />
            </linearGradient>
          </defs>

          <Area
            type="monotone"
            dataKey="value1"
            stroke="none"
            fill="url(#blueGradient)"
          />

          <Line
            type="monotone"
            dataKey="value1"
            stroke="#00CFFF"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;

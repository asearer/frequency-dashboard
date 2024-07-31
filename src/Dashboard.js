// src/Dashboard.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import './Dashboard.css';

const mockSignalData = (type) => ({
  labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`),
  datasets: [
    {
      label: `${type} Signal`,
      data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)),
      fill: false,
      borderColor: type === 'Incoming' ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)',
      tension: 0.1,
    },
  ],
});

const formatFrequency = (value) => {
  if (typeof value !== 'number') return 'N/A';
  return value.toFixed(2) + ' MHz';
};

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState('consumer');
  
  const handleToggle = () => {
    setSelectedType((prevType) => (prevType === 'consumer' ? 'satellite' : 'consumer'));
  };

  const frequencies = selectedType === 'consumer' 
    ? ['AM Radio', 'FM Radio', 'TV', 'Cellular']
    : ['Satellite A', 'Satellite B', 'Satellite C', 'Satellite D'];

  return (
    <div className="dashboard">
      <div className="tabs">
        <button onClick={handleToggle} className="toggle-button">
          {selectedType === 'consumer' ? 'Switch to Satellite' : 'Switch to Consumer'}
        </button>
      </div>
      <div className="content">
        {frequencies.map((frequency, index) => (
          <div className="frequency-item" key={index}>
            <h3>{frequency}</h3>
            <p>Frequency: {formatFrequency(Math.random() * 1000)}</p>
            <div className="dial-container">
              <div className="analog-display">
                <div className="dial"></div>
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                step="0.01"
                className="dial-slider"
                onChange={() => {}}
              />
              <div className="digital-display">{formatFrequency(Math.random() * 1000)}</div>
            </div>
            {/* Signal Visualization */}
            <div className="signal-visualization">
              <div className="signal-chart">
                <h4>Incoming Signal</h4>
                <Line data={mockSignalData('Incoming')} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              <div className="signal-chart">
                <h4>Outgoing Signal</h4>
                <Line data={mockSignalData('Outgoing')} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;











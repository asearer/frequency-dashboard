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

const formatFrequency = (value, unit) => {
  if (typeof value !== 'number') return 'N/A';
  return value.toFixed(2) + ' ' + unit;
};

const Dashboard = () => {
  const [selectedType, setSelectedType] = useState('consumer');
  const [frequencies, setFrequencies] = useState({
    AMRadio: 1000,
    FMRadio: 1000,
    TV: 1000,
    Cellular: 1000,
    SatelliteA: 5,
    SatelliteB: 5,
    SatelliteC: 5,
    SatelliteD: 5,
  });

  const handleToggle = () => {
    setSelectedType((prevType) => (prevType === 'consumer' ? 'satellite' : 'consumer'));
  };

  const handleSliderChange = (event) => {
    const { name, value } = event.target;
    setFrequencies((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  const frequencyRanges = selectedType === 'consumer'
    ? { min: 0, max: 1000, unit: 'MHz' }
    : { min: 1, max: 20, unit: 'GHz' };

  const currentFrequencies = selectedType === 'consumer'
    ? ['AMRadio', 'FMRadio', 'TV', 'Cellular']
    : ['SatelliteA', 'SatelliteB', 'SatelliteC', 'SatelliteD'];

  return (
    <div className="dashboard">
      <div className="tabs">
        <button onClick={handleToggle} className="toggle-button">
          {selectedType === 'consumer' ? 'Switch to Satellite' : 'Switch to Consumer'}
        </button>
      </div>
      <div className="content">
        {currentFrequencies.map((freqKey) => (
          <div className="frequency-item" key={freqKey}>
            <h3>{freqKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
            <p>Frequency: {formatFrequency(frequencies[freqKey], frequencyRanges.unit)}</p>
            <div className="dial-container">
              <div className="analog-display">
                <div
                  className="dial"
                  style={{
                    backgroundSize: `${(frequencies[freqKey] - frequencyRanges.min) / (frequencyRanges.max - frequencyRanges.min) * 100}% 100%`,
                  }}
                ></div>
              </div>
              <input
                type="range"
                name={freqKey}
                min={frequencyRanges.min}
                max={frequencyRanges.max}
                step="0.01"
                value={frequencies[freqKey]}
                onChange={handleSliderChange}
                className="dial-slider"
              />
              <div className="digital-display">
                {formatFrequency(frequencies[freqKey], frequencyRanges.unit)}
              </div>
            </div>
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












// src/Dashboard.js

import React, { useState } from 'react'; // Import React and useState hook from react
import { Line } from 'react-chartjs-2'; // Import Line chart component from react-chartjs-2
import 'chart.js/auto'; // Import Chart.js auto configuration
import './Dashboard.css'; // Import CSS file for styling

// Function to generate mock signal data for charts
const mockSignalData = (type) => ({
  labels: Array.from({ length: 10 }, (_, i) => `Point ${i + 1}`), // Create labels for 10 points
  datasets: [
    {
      label: `${type} Signal`, // Label for the chart dataset
      data: Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)), // Generate random data points
      fill: false, // Do not fill the area under the line
      borderColor: type === 'Incoming' ? 'rgb(75, 192, 192)' : 'rgb(255, 99, 132)', // Set color based on signal type
      tension: 0.1, // Line tension for smooth curves
    },
  ],
});

// Function to format frequency values for display
const formatFrequency = (value, unit) => {
  if (typeof value !== 'number') return 'N/A'; // Return 'N/A' if value is not a number
  return value.toFixed(2) + ' ' + unit; // Format the value to two decimal places and append the unit
};

// Main Dashboard component
const Dashboard = () => {
  // State to manage the currently selected type ('consumer' or 'satellite')
  const [selectedType, setSelectedType] = useState('consumer');
  
  // State to manage frequency values for each item
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

  // Function to handle toggling between 'consumer' and 'satellite' modes
  const handleToggle = () => {
    setSelectedType((prevType) => (prevType === 'consumer' ? 'satellite' : 'consumer'));
  };

  // Function to handle changes to the frequency slider
  const handleSliderChange = (event) => {
    const { name, value } = event.target; // Extract name and value from the event
    setFrequencies((prev) => ({
      ...prev, // Spread the previous state
      [name]: parseFloat(value), // Update the specific frequency value
    }));
  };

  // Define frequency ranges and units based on the selected type
  const frequencyRanges = selectedType === 'consumer'
    ? { min: 0, max: 1000, unit: 'MHz' }
    : { min: 1, max: 20, unit: 'GHz' };

  // Define which frequencies to display based on the selected type
  const currentFrequencies = selectedType === 'consumer'
    ? ['AMRadio', 'FMRadio', 'TV', 'Cellular']
    : ['SatelliteA', 'SatelliteB', 'SatelliteC', 'SatelliteD'];

  return (
    <div className="dashboard">
      <div className="tabs">
        {/* Button to toggle between 'consumer' and 'satellite' modes */}
        <button onClick={handleToggle} className="toggle-button">
          {selectedType === 'consumer' ? 'Switch to Satellite' : 'Switch to Consumer'}
        </button>
      </div>
      <div className="content">
        {currentFrequencies.map((freqKey) => (
          <div className="frequency-item" key={freqKey}>
            {/* Display the frequency name */}
            <h3>{freqKey.replace(/([A-Z])/g, ' $1').toUpperCase()}</h3>
            {/* Display the formatted frequency value */}
            <p>Frequency: {formatFrequency(frequencies[freqKey], frequencyRanges.unit)}</p>
            <div className="dial-container">
              {/* Analog display */}
              <div className="analog-display">
                <div
                  className="dial"
                  style={{
                    // Set background size to represent the frequency level
                    backgroundSize: `${(frequencies[freqKey] - frequencyRanges.min) / (frequencyRanges.max - frequencyRanges.min) * 100}% 100%`,
                  }}
                ></div>
              </div>
              {/* Slider input to adjust the frequency */}
              <input
                type="range"
                name={freqKey} // Name of the slider matches the frequency key
                min={frequencyRanges.min} // Minimum value of the slider
                max={frequencyRanges.max} // Maximum value of the slider
                step="0.01" // Step size for slider increments
                value={frequencies[freqKey]} // Current value of the slider
                onChange={handleSliderChange} // Handle slider change event
                className="dial-slider"
              />
              {/* Digital display of the current frequency */}
              <div className="digital-display">
                {formatFrequency(frequencies[freqKey], frequencyRanges.unit)}
              </div>
            </div>
            <div className="signal-visualization">
              {/* Incoming signal chart */}
              <div className="signal-chart">
                <h4>Incoming Signal</h4>
                <Line data={mockSignalData('Incoming')} options={{ responsive: true, maintainAspectRatio: false }} />
              </div>
              {/* Outgoing signal chart */}
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












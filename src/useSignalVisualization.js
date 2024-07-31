import { useEffect } from 'react'; // Import useEffect hook from React
import Chart from 'chart.js/auto'; // Import Chart.js for creating charts

/**
 * Custom hook to handle signal visualization on a canvas element
 * 
 * @param {string} canvasId - The id of the canvas element where the chart will be rendered
 * @param {object} data - The data to be used for the chart, containing labels and values
 */
const useSignalVisualization = (canvasId, data) => {
  // useEffect hook to handle side-effects related to the chart rendering
  useEffect(() => {
    // Get the 2D drawing context from the canvas element
    const ctx = document.getElementById(canvasId).getContext('2d');
    
    // Create a new Chart instance and pass in the configuration
    new Chart(ctx, {
      type: 'line', // Specifies the type of chart
      data: {
        labels: data.labels, // Set the labels for the x-axis
        datasets: [
          {
            label: 'Signal Strength', // Label for the dataset
            data: data.values, // Data points for the y-axis
            borderColor: '#d4af37', // Border color for the line (Gold color)
            backgroundColor: 'rgba(212, 175, 55, 0.5)', // Background color with transparency (Gold color)
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true, // Start x-axis from zero
          },
          y: {
            beginAtZero: true, // Start y-axis from zero
          },
        },
      },
    });
  }, [canvasId, data]); // Dependency array, ensures the effect runs when canvasId or data changes
};

export default useSignalVisualization; // Export the custom hook for use in other components


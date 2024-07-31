import { useEffect } from 'react';
import Chart from 'chart.js/auto';

const useSignalVisualization = (canvasId, data) => {
  useEffect(() => {
    const ctx = document.getElementById(canvasId).getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.labels,
        datasets: [
          {
            label: 'Signal Strength',
            data: data.values,
            borderColor: '#d4af37', // Gold color
            backgroundColor: 'rgba(212, 175, 55, 0.5)', // Gold color with transparency
          },
        ],
      },
      options: {
        scales: {
          x: {
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }, [canvasId, data]);
};

export default useSignalVisualization;

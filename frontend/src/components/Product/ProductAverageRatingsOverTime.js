/* ProductAverageRatingsOverTime

Purpose: To show the historical values

Usage: Pass it monthly data, and it will show it in a nice graph.

Depends on: chart.js v3

*/

import React, { useRef, useEffect } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
} from 'chart.js';

// Empty chart var
let ratingsMonthChart;

const ProductAverageRatingsOverTime = ({ monthlyData }) => {
  // Register chart elements
  Chart.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale
  );

  // Create empty ref
  const ratingsMonthChartRef = useRef(null);

  // On change of monthlyData prop or once canvas === ref.current exists, run
  useEffect(() => {
    // Skip if not data
    if (monthlyData && monthlyData.length > 0) {
      // Format data sets
      var dataSets = {
        labels: monthlyData.map((item) => item.month),
        datasets: [
          {
            label: 'Average rating',
            backgroundColor: 'rgba(0,0,0,1)',
            data: monthlyData.map((item) => item.value),
          },
        ],
      };

      // If chart already exists, detroy it first, to make sure no issue on re-rendering
      if (typeof ratingsMonthChart !== 'undefined') ratingsMonthChart.destroy();

      // If canvas exists
      if (ratingsMonthChartRef.current) {
        // create chart using set of options
        ratingsMonthChart = new Chart(ratingsMonthChartRef.current, {
          type: 'line',
          data: dataSets,
          options: {
            plugins: {
              title: {
                display: false,
              },
              legend: {
                position: 'bottom',
                labels: { boxWidth: 0, font: { size: 20 } },
              },
            },
            responsive: true,
            scales: {
              y: {
                ticks: {
                  beginAtZero: true,
                },
                min: 0,
                max: 5,
              },
            },
            maintainAspectRatio: false,
          },
        });
      }
    }
  }, [ratingsMonthChartRef, monthlyData]);

  return (
    <div style={{ position: 'relative', height: '300px' }}>
      <canvas ref={ratingsMonthChartRef} />
    </div>
  );
};

export default ProductAverageRatingsOverTime;

import React, { useRef, useEffect } from 'react';
import {
  Chart,
  LineElement,
  PointElement,
  LineController,
  CategoryScale,
  LinearScale,
} from 'chart.js';

let ratingsMonthChart;

const ProductAverageRatingsOverTime = ({ monthlyData }) => {
  Chart.register(
    LineElement,
    PointElement,
    LineController,
    CategoryScale,
    LinearScale
  );

  const ratingsMonthChartRef = useRef(null);
  useEffect(() => {
    if (monthlyData && monthlyData.length > 0) {
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

      if (typeof ratingsMonthChart !== 'undefined') ratingsMonthChart.destroy();

      if (ratingsMonthChartRef.current) {
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

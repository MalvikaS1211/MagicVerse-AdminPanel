import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const ApexChart = () => {
  const [chartOptions, setChartOptions] = useState({
    chart: {
      id: 'two-series-line-chart',
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], // X-axis categories
    },
    colors: ['#368FFB', '#33FF57'], // Colors for each series (Collateral, Acquisition)
    stroke: {
      curve: 'smooth', // Smooth line for a better visual
      width: 2, // Width of the line
    },
    // title: {
    //   text: 'Collateral vs Acquisition',
    //   align: 'center',
    // },
    dataLabels: {
      enabled: false, // Disable data labels on the lines
    },
    tooltip: {
      enabled: true, // Show tooltips when hovering over data points
    },
    legend: {
      position: 'top', // Position of the legend
    },
  });

  const [chartSeries, setChartSeries] = useState([
    {
      name: 'Collateral', // Name of the first series
      data: [30, 40, 35, 50, 49, 60], // Data points for the "Collateral" series
    },
    {
      name: 'Acquisition', // Name of the second series
      data: [20, 30, 45, 60, 49, 70], // Data points for the "Acquisition" series
    },
  ]);

  return (
    <div>
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line" // Line chart
        height={270} // Height of the chart
      />
    </div>
  );
};

export default ApexChart;

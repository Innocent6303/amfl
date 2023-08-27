import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';

const PieChart = () => {
  useEffect(() => {
    const dataPie = {
      labels: ["Amazon", "Flipkart"],
      datasets: [
        {
          label: "Sales Comparison",
          data: [50, 100],
          backgroundColor: [
            "rgb(133, 105, 241)",
            "rgb(164, 101, 241)",
          ],
          hoverOffset: 4,
        },
      ],
    };

    const configPie = {
      type: "pie",
      data: dataPie,
      options: {},
    };

    const chartPie = new Chart(document.getElementById("chartPie"), configPie);

    return () => {
      chartPie.destroy(); 
    };
  }, []); 

  return (
    <div className="shadow-lg rounded-lg overflow-hidden">
      <div className="py-3 px-5 bg-gray-50">Sales Comparison</div>
      <canvas className="p-1 ml-40 mr-40" id="chartPie"></canvas>
    </div>
  );
};

export default PieChart;

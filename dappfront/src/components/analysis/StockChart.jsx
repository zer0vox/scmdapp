import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { DateTime } from "luxon";

const StockChart = ({ dummyData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("idk");
    setData(dummyData);
  }, [dummyData]);

  useEffect(() => {
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  const renderChart = () => {
    // Group data by date and sum up the product stock
    const groupedData = data.reduce((accumulator, item) => {
      const date = DateTime.fromISO(item.ProductAddDate).toISODate();
      accumulator[date] = (accumulator[date] || 0) + item.ProductStock;
      return accumulator;
    }, {});

    // Convert grouped data back to an array
    const dates = Object.keys(groupedData).sort();
    const cumulativeStockData = [];
    let cumulativeSum = 0;

    for (const date of dates) {
      cumulativeSum += groupedData[date];
      cumulativeStockData.push(cumulativeSum);
    }

    const labels = dates.map((date) => DateTime.fromISO(date));

    const ctx = document.getElementById("stockChart");

    // Check if there's an existing chart instance and destroy it
    const existingChart = Chart.getChart(ctx);
    if (existingChart) {
      existingChart.destroy();
    }

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Cumulative Product Stock",
            data: cumulativeStockData,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "time",
            time: {
              unit: "day",
            },
            title: {
              display: true,
              text: "Date",
            },
          },
          y: {
            title: {
              display: true,
              text: "Cumulative Product Stock",
            },
          },
        },
      },
    });
  };




  return (
    <>
      <div className="h-[50vh] mt-5 bg-white mx-auto w-[50%]">
        <canvas id="stockChart"></canvas>
      </div>
    </>
  );
};

export default StockChart;

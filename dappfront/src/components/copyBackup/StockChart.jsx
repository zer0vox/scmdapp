import { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import { DateTime } from 'luxon';

const StockChart = ( {dummyData} ) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Simulate fetching data
    const fetchData = async () => {
      // Simulated axios.get call
      setData(dummyData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      renderChart();
    }
  }, [data]);

  const renderChart = () => {
    const labels = data.map((item) => DateTime.fromISO(item.ProductAddDate));
    const stockData = data.map((item) => item.ProductStock);

    const ctx = document.getElementById("stockChart1");

    new Chart(ctx, {
      type: "line",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Product Stock",
            data: stockData,
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
              text: "Product Stock",
            },
          },
        },
      },
    });
  };

  return (
    <>
      <div className="h-[50vh] mt-5 bg-white mx-auto w-[50%]">
        <canvas id="stockChart1"></canvas>
      </div>
    </>
  );
};

export default StockChart;

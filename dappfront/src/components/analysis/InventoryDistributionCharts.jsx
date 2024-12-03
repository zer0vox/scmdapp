import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';

const InventoryDistributionChart = ({ data }) => {
  const [distributionData, setDistributionData] = useState([]);

  useEffect(() => {
    const calculateTotalCost = (item) => item.StartInventory * item.ProductCost;
    const calculateTotalRevenue = (item) => item.ProductSaleQuantity * item.ProductSale;

    const distributionChartData = data.map(item => ({
      name: item.ProductName,
      quantity: item.StartInventory,
      totalCost: calculateTotalCost(item),
      totalRevenue: calculateTotalRevenue(item),
      totalItemsSold: item.ProductSaleQuantity
    }));

    setDistributionData(distributionChartData);
  }, [data]);

  // Prepare data for the pie charts
  const quantityData = distributionData.map(item => item.quantity);
  const costData = distributionData.map(item => item.totalCost);
  const revenueData = distributionData.map(item => item.totalRevenue);
  const itemsSoldData = distributionData.map(item => item.totalItemsSold);

  const chartDataQuantity = {
    labels: distributionData.map(item => item.name),
    datasets: [
      {
        label: 'Quantity Distribution',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0'],
        data: quantityData
      }
    ]
  };

  const chartDataCost = {
    labels: distributionData.map(item => item.name),
    datasets: [
      {
        label: 'Total Cost Distribution',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0'],
        data: costData
      }
    ]
  };

  const chartDataRevenue = {
    labels: distributionData.map(item => item.name),
    datasets: [
      {
        label: 'Total Revenue Generated',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0'],
        data: revenueData
      }
    ]
  };

  const chartDataItemsSold = {
    labels: distributionData.map(item => item.name),
    datasets: [
      {
        label: 'Total Items Sold Distribution',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#8BC34A', '#9C27B0'],
        data: itemsSoldData
      }
    ]
  };

  return (
    <><div className='flex flex-col justify-evenly'>
      <div className="flex justify-evenly flex-wrap">
        <div className="chart-container bg-transparent p-5 rounded-lg w-[25%]">
          <h2 className="text-lg font-semibold mb-3">Quantity Distribution</h2>
          <Pie data={chartDataQuantity} />
        </div>
        <div className="chart-container bg-transparent p-5 rounded-lg w-[25%]">
          <h2 className="text-lg font-semibold mb-3">Total Cost Distribution</h2>
          <Pie data={chartDataCost} />
              </div>
              </div>
              <div className="flex justify-evenly flex-wrap">
        <div className="chart-container bg-transparent p-5 rounded-lg w-[25%]">
          <h2 className="text-lg font-semibold mb-3">Total Revenue Generated</h2>
          <Pie data={chartDataRevenue} />
        </div>
        <div className="chart-container bg-transparent p-5 rounded-lg w-[25%]">
          <h2 className="text-lg font-semibold mb-3">Total Items Sold Distribution</h2>
          <Pie data={chartDataItemsSold} />
              </div>
              </div>
          </div>
      
    </>
  );
};

export default InventoryDistributionChart;

import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const InventoryTurnover = ( {data} ) => {

  // Calculate inventory turnover for each item
  const calculateInventoryTurnover = (item) => {
    const averageInventory = (item.StartInventory + item.ProductStock) / 2;
    const turnover = averageInventory !== 0 ? item.ProductSaleQuantity / averageInventory : 0;
    return parseFloat(turnover.toFixed(2));
  };

  const [inventoryTurnoverData, setInventoryTurnoverData] = useState([]);

  useEffect(() => {
    console.log("this is the data here"+data)
    const turnoverData = data.map(item => ({
      name: item.ProductName,
      turnover: calculateInventoryTurnover(item)
    }));
    setInventoryTurnoverData(turnoverData);
  }, [data]);

  // Prepare data for the chart
  const chartData = {
    labels: inventoryTurnoverData.map(item => item.name),
    datasets: [
      {
        label: 'Inventory Turnover',
        backgroundColor: 'rgba(75,192,192,1)',
        borderColor: 'rgba(0,0,0,1)',
        borderWidth: 1,
        data: inventoryTurnoverData.map(item => item.turnover)
      }
    ]
  };

  return (
    <>
    <div className='bg-white mt-5 mx-auto h-[50vh] w-[50%]'>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }}
      />
    </div>
    </>
  );
};

export default InventoryTurnover;

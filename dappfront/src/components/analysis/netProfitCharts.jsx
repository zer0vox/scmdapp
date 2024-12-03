import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const NetProfitChart = ({ data }) => {
    const [netProfitData, setNetProfitData] = useState([]);

    useEffect(() => {
        const calculateNetProfit = (item) => {
            const totalCost = item.StartInventory * item.ProductCost;
            const totalRevenue = item.ProductSaleQuantity * item.ProductSale;
            return totalRevenue - totalCost;
        };

        const netProfitChartData = data.map(item => ({
            name: item.ProductName,
            netProfit: calculateNetProfit(item)
        }));

        setNetProfitData(netProfitChartData);
    }, [data]);

    // Prepare data for the bar chart
    const chartData = {
        labels: netProfitData.map(item => item.name),
        datasets: [
            {
                label: 'Net Profit',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: netProfitData.map(item => item.netProfit)
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

export default NetProfitChart;

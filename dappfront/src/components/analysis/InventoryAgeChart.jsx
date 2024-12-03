import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

const InventoryAgeChart = ({ data }) => {

    // Calculate the age of the remaining stock for each item
    const calculateInventoryAge = (item) => {
        const currentDate = new Date();
        const addDate = new Date(item.ProductAddDate); // Assuming ProductAddDate is available in the item data

        // Calculate the age in days
        const ageInDays = Math.floor((currentDate - addDate) / (24 * 60 * 60 * 1000));

        return ageInDays;
    };

    const [inventoryAgeData, setInventoryAgeData] = useState([]);

    useEffect(() => {
        console.log("this is the data here" + data);
        const ageData = data.map(item => ({
            name: item.ProductName,
            age: calculateInventoryAge(item)
        }));
        setInventoryAgeData(ageData);
    }, [data]);

    // Prepare data for the chart
    const chartData = {
        labels: inventoryAgeData.map(item => item.name),
        datasets: [
            {
                label: 'Inventory Age (Days)',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 1,
                data: inventoryAgeData.map(item => item.age)
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

export default InventoryAgeChart;

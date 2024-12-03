import ManufacturerChart from '../components/analysis/StockChart';
import Tabular from '../components/analysis/Tabular'
import InventoryAgeChart from '../components/analysis/InventoryAgeChart'
import { useEffect, useState } from 'react';
import { navigate } from 'react'
import axios from 'axios'


const RetailerAnalysis = ({globalName, globalKey, auth, entity}) => {
  const [amountsData, setAmountsData] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated, otherwise redirect to login
    auth == 'auth', entity == "r";
    if (auth !=='auth' || entity !== "r") {
      console.log(`authentication = ${auth} and entity = ${entity}`);
      navigate("/login");
    }
    fetchData();
  }, [auth, navigate, entity]);
  
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:3001/getfromtable", {
        params: {
          globalName,
          globalKey,
          entity,
        },
      });

      if (response.data) {
        console.log("Response from backend in r-analysis:", response.data);
        setAmountsData(response.data);
      } else {
        console.log("No data received in r analysis");
      }
    } catch (error) {
      console.log(`Error fetching data in r anaylis`, error);
    }
  }
  const data = [
    { name: 'Current Noodles', startInventory: 15, purchases: 53, soldQuantity: 52, endingInventory: 16 },
    { name: 'Potato Biscuit', startInventory: 10, purchases: 3, soldQuantity: 12, endingInventory: 1 },
    { name: 'Tasty Biscuit', startInventory: 6, purchases: 12, soldQuantity: 8, endingInventory: 10 },
    { name: 'Goodlife Sugarfree Biscuit', startInventory: 5, purchases: 8, soldQuantity: 7, endingInventory: 6 },
    { name: 'Thinarot Biscuit', startInventory: 10, purchases: 4, soldQuantity: 3, endingInventory: 11 },
    { name: 'Digestive Nuts', startInventory: 5, purchases: 6, soldQuantity: 5, endingInventory: 6 },
    { name: 'Digestive family Biscuit', startInventory: 4, purchases: 3, soldQuantity: 2, endingInventory: 5 },
    { name: 'Digestive Biscuit', startInventory: 10, purchases: 6, soldQuantity: 4, endingInventory: 12 },
    { name: 'Eclaires Chocolate', startInventory: 2, purchases: 2, soldQuantity: 2, endingInventory: 2 },
    { name: 'Bonbon Biscuit', startInventory: 4, purchases: 3, soldQuantity: 2, endingInventory: 5 },
    { name: 'Glucose', startInventory: 11, purchases: 1, soldQuantity: 1, endingInventory: 11 },
    { name: 'Khaja Biscuit', startInventory: 2, purchases: 1, soldQuantity: 1, endingInventory: 2 },
    { name: 'Butter cracker Biscuit', startInventory: 2, purchases: 1, soldQuantity: 1, endingInventory: 2 },
    { name: 'Quality Soap', startInventory: 4, purchases: 4, soldQuantity: 3, endingInventory: 5 },
    { name: 'Ready Surf', startInventory: 6, purchases: 1, soldQuantity: 1, endingInventory: 6 },
    { name: 'Chocolove', startInventory: 2, purchases: 2, soldQuantity: 2, endingInventory: 2 },
    { name: 'Imilybum', startInventory: 7, purchases: 1, soldQuantity: 1, endingInventory: 7 },
    { name: 'Thinararot', startInventory: 4, purchases: 3, soldQuantity: 2, endingInventory: 5 },
    { name: 'Cream Biscuit', startInventory: 7, purchases: 7, soldQuantity: 4, endingInventory: 10 },
    { name: 'Sugar Cracker', startInventory: 4, purchases: 7, soldQuantity: 3, endingInventory: 8 },
    { name: 'Current Cheeseball', startInventory: 14, purchases: 7, soldQuantity: 12, endingInventory: 9 },
    { name: 'Gulcose', startInventory: 2, purchases: 1, soldQuantity: 1, endingInventory: 2 },
    { name: 'Crackies Biscuit', startInventory: 4, purchases: 3, soldQuantity: 1, endingInventory: 6 },
    { name: 'Dialbar Soap', startInventory: 12, purchases: 4, soldQuantity: 3, endingInventory: 13 }
  ];

  const dummyData = [
    { ProductAddDate: "2024-01-01", ProductStock: 50 },
    { ProductAddDate: "2024-01-02", ProductStock: 160 },
    { ProductAddDate: "2024-01-03", ProductStock: 160 },
    { ProductAddDate: "2024-01-04", ProductStock: 105 },
    { ProductAddDate: "2024-01-05", ProductStock: 120 },
    { ProductAddDate: "2024-01-06", ProductStock: 10 },
    { ProductAddDate: "2024-01-07", ProductStock: 100 },
    { ProductAddDate: "2024-01-08", ProductStock: 95 },
    { ProductAddDate: "2024-01-09", ProductStock: 105 },
    { ProductAddDate: "2024-01-10", ProductStock: 120 },
    { ProductAddDate: "2024-01-11", ProductStock: 99 },
    { ProductAddDate: "2024-01-12", ProductStock: 95 },
    { ProductAddDate: "2024-01-13", ProductStock: 105 },
];

  return (
    <>
      <div className="bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500 pt-8 pb-8">
        <ManufacturerChart dummyData={amountsData} />
        <div className='text-center input-label'>Amount of Products per Day</div>

        <Tabular data={amountsData} />
        <div className='text-center input-label'>Inventory Analysis per Products in Table</div>
        {amountsData.length > 0 ? (
          <>
            <InventoryAgeChart data={amountsData} />
            <div className='text-center input-label'>Inventory Age Chart</div>
          </>
        ) : (
          <div>No data available for forecasting</div>
        )}
      </div>
    </>
  )
}

export default RetailerAnalysis
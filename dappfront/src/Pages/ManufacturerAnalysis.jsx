import ManufacturerChart from '../components/analysis/StockChart';
import ManufacturerBarGraph from '../components/analysis/InventoryTurnover';
import Tabular from '../components/analysis/Tabular'
import InventoryAgeChart from '../components/analysis/InventoryAgeChart'
import { useEffect, useState } from 'react';
import { navigate } from 'react'
import axios from 'axios'
import InventoryDistributionChart from '../components/analysis/InventoryDistributionCharts';
import NetProfitChart from '../components/analysis/netProfitCharts';

const ManufacturingAnalysis = ({globalName, globalKey, auth, entity}) => {
  const [amountsData, setAmountsData] = useState([]);

  useEffect(() => {
    // Check if the user is authenticated, otherwise redirect to login
    // auth == 'auth', entity == "m";

    if (auth !=='auth' || entity !== "m") {
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
        console.log("Response from backend in m-analysis:", response.data);
        setAmountsData(response.data);
      } else {
        console.log("No data received in m analysis");
      }
    } catch (error) {
      console.log(`Error fetching data in m anaylis`, error);
    }
  }

  return (
    <>
      <div className="bg-gradient-to-r from-lime-400 via-lime-300 to-lime-500 pt-8 pb-8">
        <ManufacturerChart dummyData={amountsData} />
        <div className='text-center input-label'>Amount of Products per Day</div>

        <ManufacturerBarGraph data={amountsData} />
        <div className='text-center input-label'>Inventory Turnover Analysis per Products</div>

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
        {amountsData.length > 0 ? (
          <>
            <InventoryDistributionChart data={amountsData} />
            <div className='text-center input-label'>Inventory Distribution Charts</div>
          </>
        ) : (
          <div>No data available for forecasting</div>
        )}
        {amountsData.length > 0 ? (
          <>
            <NetProfitChart data={amountsData} />
            <div className='text-center input-label'>Net Profit Chart</div>
          </>
        ) : (
          <div>No data available for forecasting</div>
        )}
      </div>
    </>
  )
}

export default ManufacturingAnalysis
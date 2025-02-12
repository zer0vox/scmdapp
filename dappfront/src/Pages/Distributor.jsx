import PurchaseItemByDistributor from "../components/PurchaseItemByDistributor";
import ReceivedItemByDistributor from "../components/ReceivedItemByDistributor";
import SellItemByDistributor from "../components/SellItemByDistributor";
import ShippedItemByDistributor from "../components/ShippedItemByDistributor";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

// ... (imports)

const Distributor = ({
  contractInstance,
  globalName,
  globalKey,
  auth,
  entity,
}) => {
  const navigate = useNavigate();
  const [ProductCode, setProductCode] = useState("");
  const [ProductStock, setProductStock] = useState("");
  const [ProductAddDate, setProductAddDate] = useState(new Date());
  const [ProductSaleQuantity, setProductSaleQuantity] = useState("");
  const [ProductCost, setProductCost] = useState("");
  const [ProductSale, setProductSale] = useState("");
  const [TableResult, setResultTable] = useState([]);

  (auth = "auth"), (entity = "d");
  useEffect(() => {
    if (auth !== "auth" || entity !== "d") {
      navigate("/login");
    }

    getTable();
  }, [auth, navigate, entity]);
  async function getTable() {
    try {
      const response = await axios.get("http://localhost:3001/getfromtable", {
        params: {
          globalName,
          globalKey,
          entity,
        },
      });

      if (response.data) {
        console.log("Response from backend:", response.data);
        setResultTable(response.data);
      } else {
        console.log("No data received");
      }
    } catch (error) {
      console.log(`Error fetching data`, error);
    }
  }

  const setInventory = async (e) => {
    e.preventDefault();
    try {
      const existingProduct = TableResult.find(
        (item) => item.ProductCode === ProductCode && item.entity === entity
      );

      if (existingProduct) {
        // Update existing product
        const updateResult = await axios.put(
          `http://localhost:3001/${existingProduct._id}`,
          {
            globalName,
            globalKey,
            entity,
            ProductCode,
            ProductCost,
            ProductStock,
            ProductSale,
            ProductSaleQuantity,
            ProductAddDate,
          }
        );

        console.log("Data updated with id:", updateResult);
      } else {
        // Add new product
        const addResult = await axios.post("http://localhost:3001/addtotable", {
          globalName,
          globalKey,
          entity,
          ProductCode,
          ProductCost,
          ProductStock,
          ProductSale,
          ProductSaleQuantity,
          ProductAddDate,
        });

        console.log("Data added to the table:", addResult);
      }

      // Clear input fields after submission
      setProductCode("");
      setProductCost("");
      setProductStock("");
      setProductSale("");
      setProductSaleQuantity("");
      setProductAddDate(new Date());
      getTable();
      // Refresh the table after submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 pt-8 pb-4">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <PurchaseItemByDistributor
            contract={contractInstance}
            globalName={globalName}
            globalKey={globalKey}
            entity={entity}
          />
          <ReceivedItemByDistributor
            contract={contractInstance}
            globalName={globalName}
            globalKey={globalKey}
            entity={entity}
          />
          <SellItemByDistributor
            contract={contractInstance}
            globalName={globalName}
            globalKey={globalKey}
            entity={entity}
          />
          <ShippedItemByDistributor
            contract={contractInstance}
            globalName={globalName}
            globalKey={globalKey}
            entity={entity}
          />
        </div>
      </div>
    </>
  );
};

export default Distributor;

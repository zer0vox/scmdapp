import React, { useState } from 'react';
import axios from 'axios';
const ShippedItemByDistributor = ({ contract, globalName,
  globalKey,
  entity }) => {
  const [productCode, setProductCode] = useState();
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(""); 
  const [displayShip, setDisplayShip] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const tx = await contract.shippedItemByDistributor(productCode);
      await tx.wait();
      try {
        const existingProduct = await axios.get("http://localhost:3001/getfromtable2nd", {
          params: {
            ProductCode: productCode,
            entity: 'r'
          },
        })
        console.log('we are in line 23')
        console.log(existingProduct.data)
        console.log(existingProduct.data.ProductStock, existingProduct.data.ProductCost)

        const existingProductDistributor = await axios.get("http://localhost:3001/getfromtable2nd", {
          params: {
            ProductCode: productCode,
            entity: entity
          },
        });
        console.log('2 lines below')
        console.log(existingProductDistributor.data.ProductStock, existingProductDistributor.data.ProductCost)


        try {


          // Update existing product
          console.log("Request Payload:", {
            id: existingProductDistributor.data._id,
            globalName: existingProductDistributor.data.globalName, globalKey: existingProductDistributor.data.globalKey,
            entity: existingProductDistributor.data.entity,
            ProductCode: productCode,
            ProductName: existingProductDistributor.data.ProductName,
            ProductCost: existingProductDistributor.data.ProductCost,
            ProductStock: existingProductDistributor.data.ProductStock - existingProduct.data.ProductStock,
            ProductSale: existingProduct.data.ProductCost,
            ProductSaleQuantity: existingProduct.data.ProductStock,
            ProductAddDate: existingProductDistributor.data.ProductAddDate
          })
          const updateResult = await axios.put(`http://localhost:3001/${existingProductDistributor.data._id}`, {
            globalName: existingProductDistributor.data.globalName,
            globalKey: existingProductDistributor.data.globalKey,
            entity: existingProductDistributor.data.entity,
            ProductCode: productCode,
            StartInventory: existingProductDistributor.data.StartInventory,
            ProductName: existingProductDistributor.data.ProductName,
            ProductCost: existingProductDistributor.data.ProductCost,
            ProductStock: existingProductDistributor.data.ProductStock - existingProduct.data.ProductStock,
            ProductSale: existingProduct.data.ProductCost,
            ProductSaleQuantity: existingProduct.data.ProductStock,
            ProductAddDate: existingProductDistributor.data.ProductAddDate
          });

          console.log('Data updated with id:', updateResult);



        }

        catch (err) {
          console.log(`we have an error ${err}`)
          setDisplayShip("An error occurred while processing the transaction.")
        }
      }
      catch (err) {
        console.log(`we have an error ${err}`)
        setDisplayShip("An error occurred while processing the transaction.")
      }
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setDisplayShip("An error occurred while processing the transaction.")
    }
  };
  return (
    <>
<div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {error && <p className="text-red-500">Error: {error}</p>}

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Ship Items
          </h6>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="ship-code"
                >
                  Item Code
                </label>
                <input
                  type="text"
                  id="ship-code"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Product Code"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="ship-quantity"
                >
                  Quantity
                </label>
                <input
                  type="number"
                  id="ship-quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Quantity"
                />
              </div>
              <button className="custom-button w-full mt-3">
                Ship Item
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ShippedItemByDistributor;

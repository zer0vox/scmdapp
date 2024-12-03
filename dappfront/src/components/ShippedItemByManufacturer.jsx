import { useState } from "react";
import axios from "axios";
const ShippedItemByManufacturer = ({ contract, globalKey, globalName, entity }) => {
  const [productCode, setProductCode] = useState();
 
  const [error, setError] = useState(null);
  const [displayShip, setDisplayShip] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode) {
        setError("Product code and quantity are required");
        return;
      }
      console.log('line 16 done')
      const tx = await contract.shippedItemByManufacturer(
        productCode
      );
      await tx.wait();
      console.log('line 22 done')
      try {
        const existingProduct = await axios.get("http://localhost:3001/getfromtable2nd", {
          params: {
            ProductCode: productCode,
            entity: 'd'
          },
        })
        console.log('we are in line 23')
        console.log(existingProduct.data)
        console.log(existingProduct.data.ProductStock, existingProduct.data.ProductCost)

        const existingProductManufacturer = await axios.get("http://localhost:3001/getfromtable2nd", {
          params: {
            ProductCode: productCode,
            entity: entity
          },
        });
        console.log('2 lines below')
        console.log(existingProductManufacturer.data.ProductStock, existingProductManufacturer.data.ProductCost)


        try {


          // Update existing product
          console.log("Request Payload:", {
            id: existingProductManufacturer.data._id,
            globalName: existingProductManufacturer.data.globalName, globalKey: existingProductManufacturer.data.globalKey,
            entity: existingProductManufacturer.data.entity,
            ProductCode: productCode,
            ProductName: existingProductManufacturer.data.ProductName,
            ProductCost: existingProductManufacturer.data.ProductCost,
            ProductStock: existingProductManufacturer.data.ProductStock - existingProduct.data.ProductStock,
            ProductSale: existingProduct.data.ProductCost,
            ProductSaleQuantity: existingProduct.data.ProductStock,
            ProductAddDate: existingProductManufacturer.data.ProductAddDate
          })
          const updateResult = await axios.put(`http://localhost:3001/${existingProductManufacturer.data._id}`, {
            globalName: existingProductManufacturer.data.globalName,
            globalKey: existingProductManufacturer.data.globalKey,
            entity: existingProductManufacturer.data.entity,
            ProductCode: productCode,
            StartInventory: existingProductManufacturer.data.StartInventory,
            ProductName: existingProductManufacturer.data.ProductName,
            ProductCost: existingProductManufacturer.data.ProductCost,
            ProductStock: existingProductManufacturer.data.ProductStock - existingProduct.data.ProductStock,
            ProductSale: existingProduct.data.ProductCost,
            ProductSaleQuantity: existingProduct.data.ProductStock,
            ProductAddDate: existingProductManufacturer.data.ProductAddDate
          });

          console.log('Data updated with id:', updateResult);



        }

        catch (err) {
          console.log(`we have an error ${err}`)
        }
      }
      catch (err) {
        console.log(`we have an error ${err}`)
      }

      console.log(
        `Item with product code ${productCode} shipped by manufacturer`
      );
      setDisplayShip(`Item with product code ${productCode} shipped by manufacturer`)
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
              <button className="custom-button w-full mt-3">
                Ship Item
              </button>
            </div>
          </form>
          <h4>{displayShip}</h4>
        </div>
      </div>
    </>
  );
};

export default ShippedItemByManufacturer;

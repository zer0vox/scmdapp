import React, { useState } from "react";
import axios from "axios";
const PurchaseItemByDistributor = ({
  contract,
  globalName,
  globalKey,
  entity,
}) => {
  const [productCode, setProductCode] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const [displayProduct, setDisplayProduct] = useState("");
  const [ProductAddDate, setProductAddDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price || !quantity) {
        setError("Product code, price, and quantity are required");
        return;
      }

      const tx = await contract.purchaseItemByDistributor(
        productCode,
        price,
        quantity
      );

      await tx.wait();
      const existingProduct = await axios.get(
        "http://localhost:3001/getfromtable2nd",
        {
          params: {
            ProductCode: productCode,
            entity: "m",
          },
        }
      );
      const addResult = await axios.post("http://localhost:3001/addtotable", {
        globalName,
        globalKey,
        entity,
        ProductCode: productCode,
        ProductName: existingProduct.data.ProductName,
        StartInventory: quantity,
        ProductCost: price,
        ProductStock: quantity,
        ProductSale: 0,
        ProductSaleQuantity: 0,
        ProductAddDate,
      });
      setProductAddDate(new Date());
      console.log("Data added to the table:", addResult);

      console.log(
        `Item with product code ${productCode} purchased by distributor`
      );
      setDisplayProduct(
        `Product added successfully with productCode: ${productCode}`
      );
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setDisplayProduct("An error occurred while processing the transaction.");
    }
  };

  return (
    <>
      <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Distributor */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {error && <p className="text-red-500">Error: {error}</p>}

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Purchase Item
          </h6>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Product Code
                </label>
                <input
                  type="text"
                  id="name"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Product Code"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="unit"
                >
                  Product Price
                </label>
                <input
                  type="number"
                  id="unit"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Product Price"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="code"
                >
                  Product Quantity
                </label>
                <input
                  type="text"
                  id="code"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Product Quantity"
                />
              </div>
              <button
                className="custom-button w-full mt-3"
                onClick={handleSubmit}
              >
                Purchase Item
              </button>
            </div>
          </form>
          <h4>{displayProduct}</h4>
        </div>
      </div>
    </>
  );
};

export default PurchaseItemByDistributor;

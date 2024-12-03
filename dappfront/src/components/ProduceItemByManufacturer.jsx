import React, { useState, useEffect } from "react";
import axios from "axios";
const ProduceItemByManufacturer = ({
  contract,
  entity,
  globalName,
  globalKey,
}) => {
  const [stockUnit, setStockUnit] = useState();
  const [productCode, setProductCode] = useState();
  const [manufacturerName, setManufacturerName] = useState(globalName);
  const [manufacturerInformation, setManufacturerInformation] = useState("");
  const [productNotes, setProductNotes] = useState("");
  const [price, setPrice] = useState();
  const [itemadded, setItemAdded] = useState("false");
  const [error, setError] = useState(null);
  const [displayProduct, setDisplayProduct] = useState("");
  const [ProductAddDate, setProductAddDate] = useState(new Date());

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (
        !stockUnit ||
        !productCode ||
        !manufacturerName ||
        !manufacturerInformation ||
        !productNotes ||
        !price
      ) {
        setError("All fields are required");
        return;
      }

      const tx = await contract.produceItemByManufacturer(
        stockUnit,
        productCode,
        manufacturerName,
        manufacturerInformation,
        productNotes,
        price
      );

      await tx.wait();
      setProductAddDate(new Date());
      const addResult = await axios.post("http://localhost:3001/addtotable", {
        globalName: globalName,
        globalKey: globalKey,
        entity: entity,
        ProductCode: productCode,
        ProductName: productNotes,
        StartInventory: stockUnit,
        ProductCost: price,
        ProductStock: stockUnit,
        ProductSale: 0,
        ProductSaleQuantity: 0,
        ProductAddDate,
      });
      console.log(addResult);
      setItemAdded(true);

      console.log(
        `Product added successfully with productCode: ${productCode}`
      );
      console.log(`stockunit:${stockUnit}`);
      console.log(`manufacturerName:${manufacturerName}`);
      console.log(`manufacturerInformation:${manufacturerInformation}`);
      console.log(`productNotes:${productNotes}`);
      console.log(`price:${price}`);
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

  useEffect(() => {}, [
    productCode,
    manufacturerName,
    manufacturerInformation,
    productNotes,
    price,
  ]);

  return (
    <>
      <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {error && <p className="text-red-500">Error: {error}</p>}

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Produced Item
          </h6>
          <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Manufacturer Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={manufacturerName}
                  onChange={(e) => setManufacturerName(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  defaultValue={globalName}
                />
              </div>
            </div>
          <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="unit"
                >
                  Stock unit
                </label>
                <input
                  type="text"
                  id="unit"
                  value={stockUnit}
                  onChange={(e) => setStockUnit(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Stock Unit"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="code"
                >
                  Product Code
                </label>
                <input
                  type="text"
                  id="code"
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
                  htmlFor="info"
                >
                  Manufacturer Information
                </label>
                <input
                  type="text"
                  id="info"
                  value={manufacturerInformation}
                  onChange={(e) => setManufacturerInformation(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Manufacturer Information"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="note"
                >
                  Product Name
                </label>
                <input
                  type="text"
                  id="note"
                  value={productNotes}
                  onChange={(e) => setProductNotes(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="price"
                >
                  Product Price
                </label>
                <input
                  type="Number"
                  id="price"
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Product Price"
                />
              </div>
              <button className="custom-button w-full mt-3"
              onClick={handleSubmit}>
                Produce Item
              </button>
            </div>
          </form>
          <h4>{displayProduct}</h4>
        </div>
      </div>
    </>
  );
};

export default ProduceItemByManufacturer;

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
      <div className="mx-auto w-[50%]">
        {error && <p className="text-red-500">Error: {error}</p>}
        <form className="custom-form" onSubmit={handleSubmit}>
          <input
            value={manufacturerName}
            onChange={(e) => setManufacturerName(e.target.value)}
            placeholder={globalName}
            className="custom-field"
          />

          <input
            value={stockUnit}
            onChange={(e) => setStockUnit(e.target.value)}
            placeholder="Stock Unit"
            className="custom-field"
          />

          <input
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Product Code"
            className="custom-field"
          />

          <input
            value={manufacturerInformation}
            onChange={(e) => setManufacturerInformation(e.target.value)}
            placeholder="Manufacturer Information"
            className="custom-field"
          />

          <input
            value={productNotes}
            onChange={(e) => setProductNotes(e.target.value)}
            placeholder="Product Notes"
            className="custom-field"
          />

          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className="custom-field"
          />

          <button className="custom-button" type="submit">
            Produce item
          </button>
        </form>
        <h4 className="mt-4">{displayProduct}</h4>
      </div>
    </>
  );
};

export default ProduceItemByManufacturer;

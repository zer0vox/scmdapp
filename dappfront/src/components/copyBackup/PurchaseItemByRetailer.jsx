import React, { useState } from "react";
import axios from "axios";
const PurchaseItemByRetailer = ({ contract, globalName,
  globalKey,
  entity, }) => {
  const [productCode, setProductCode] = useState();
  const [price, setPrice] = useState()
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

      const tx = await contract.purchaseItemByRetailer(
        productCode,
        parseInt(quantity), // Convert quantity to a number
        parseInt(price) // Convert price to a number
      );
      await tx.wait();
      const existingProduct = await axios.get("http://localhost:3001/getfromtable2nd", {
        params: {
          ProductCode: productCode,
          entity: 'd'
        },
      })
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
        ProductAddDate
      });
      setProductAddDate(new Date());
      console.log('Data added to the table:', addResult);
      console.log(
        `Item with product code ${productCode} purchased by retailer`
      );
      setDisplayProduct(`Product added successfully with productCode: ${productCode}`)
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setDisplayProduct("An error occurred while processing the transaction.")
    }
  };

  return (
    <>
      <div className="mx-auto w-[50%]">
        {error && <p>Error: {error}</p>}
        <form className="custom-form" onSubmit={handleSubmit}>
          <input
            type="text"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Product Code"
            className="custom-field"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Product Price"
            className="custom-field"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="custom-field"
          />
          <button className="custom-button" type="submit">
            Purchase item
          </button>
        </form>
        <h4>
          {displayProduct}
        </h4>
      </div>
    </>
  );
};

export default PurchaseItemByRetailer;

import React, { useState } from "react";

const SellItemByRetailer = ({ contract }) => {
  const [productCode, setProductCode] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState(null);
  const [displaySale, setdisplaySale] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price) {
        setError("Product code and price are required");
        return;
      }

      const tx = await contract.sellItemByRetailer(productCode, price);
      await tx.wait();

      console.log(
        `Item with product code ${productCode} put up for sale by retailer for price ${price}`
      );
      setdisplaySale(`Item with product code ${productCode} is now for sale by the manufacturer for price ${price}`)
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setdisplaySale("An error occurred while processing the transaction.")
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
            placeholder="Price"
            className="custom-field"
          />
          <button className="custom-button" type="submit">
            Put up for sale
          </button>
        </form>
        <h4>{displaySale}</h4>
      </div>
    </>
  );
};

export default SellItemByRetailer;

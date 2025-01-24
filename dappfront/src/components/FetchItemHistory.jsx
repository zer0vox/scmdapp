import React, { useState } from "react";

const FetchItemHistory = ({ contract }) => {
  const [productCode, setProductCode] = useState("");
  const [error, setError] = useState(null);
  const [itemHistory, setItemHistory] = useState(null);

  const handleFetchItemHistory = async () => {
    try {
      if (!productCode) {
        setError("Product code is required");
        return;
      }

      const result = await contract.fetchitemHistory(productCode); // Replace with your contract function

      // Update item history state
      setItemHistory({
        blockManufacutrerToDistributor: result[0].toString(),
        blockDistributorToRetailer: result[1].toString(),
        blockRetailerToConsumer: result[2].toString(),
      });
    } catch (error) {
      setError(
        error.message || "An error occurred while fetching item history."
      );
    }
  };

  return (
    <div className="mx-auto w-full flex flex-row justify-center">
      <div className="custom-form">
        {error && <p>Error: {error}</p>}
        <input
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Product Code"
          className="custom-field"
        />
        <button className="custom-button" onClick={handleFetchItemHistory}>Fetch Item History</button>

        {itemHistory && (
          <div className="custom-form">
            <p>
              Manufacturer to Distributor:{" "}
              {itemHistory.blockManufacutrerToDistributor}
            </p>
            <p>
              Distributor to Retailer: {itemHistory.blockDistributorToRetailer}
            </p>
            <p>Retailer to Consumer: {itemHistory.blockRetailerToConsumer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchItemHistory;

import React, { useState } from "react";

const FetchItemHistory = ({ contract }) => {
  const [productCode, setProductCode] = useState("");
  const [error, setError] = useState(null);
  const [itemHistory, setItemHistory] = useState(null);

  const handleFetchItemHistory = async () => {
    try {
      if (!productCode.trim()) {
        setError("Product code is required");
        return;
      }
      setError(null); // Clear previous errors

      const result = await contract.fetchitemHistory(productCode); // Ensure correct function name
      
      if (!result || result.length < 3) {
        throw new Error("Invalid response from contract");
      }

      // Update item history state
      setItemHistory({
        blockManufacturerToDistributor: result[0]?.toString() || "N/A",
        blockDistributorToRetailer: result[1]?.toString() || "N/A",
        blockRetailerToConsumer: result[2]?.toString() || "N/A",
      });
    } catch (error) {
      setError(error.message || "An error occurred while fetching item history.");
    }
  };

  return (
    <div className="mx-auto w-full flex flex-row justify-center">
      <div className="custom-form">
        {error && <p className="text-red-500">Error: {error}</p>}
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
            <p>Manufacturer to Distributor: {itemHistory.blockManufacturerToDistributor}</p>
            <p>Distributor to Retailer: {itemHistory.blockDistributorToRetailer}</p>
            <p>Retailer to Consumer: {itemHistory.blockRetailerToConsumer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchItemHistory;

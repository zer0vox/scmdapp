import React, { useState } from "react";

const FetchItem = ({ contract }) => {
  const [productCode, setProductCode] = useState("");
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState(null);

  const itemStates = [
    "Produced by Manufacturer",
    "For Sale by Manufacturer",
    "Purchased by Distributor",
    "Shipped by Manufacturer",
    "Received by Distributor",
    "For Sale by Distributor",
    "Purchased by Retailer",
    "Shipped by Distributor",
    "Received by Retailer",
    "For Sale by Retailer",
    "Purchased by Consumer"
  ];

  const formatAddress = (address) => {
    return address === "0x0000000000000000000000000000000000000000" ? "N/A" : address;
  };

  const handleFetchItem = async () => {
    try {
      if (!productCode.trim()) {
        setError("Product code is required");
        return;
      }
      setError(null); // Clear previous errors

      const fetchedData = await contract.fetchItemtwo(productCode);
      console.log(fetchedData);

      if (!fetchedData || fetchedData.length < 11) {
        throw new Error("Invalid response from contract");
      }

      const timestamp = parseInt(fetchedData[5]);
      const date = isNaN(timestamp) ? "Invalid Date" : new Date(timestamp * 1000).toDateString();
      const itemStateIndex = parseInt(fetchedData[6]);
      const itemStateDescription = itemStates[itemStateIndex] || "Unknown State";

      const formattedData = {
        stockUnit: fetchedData[0]?.toString() || "N/A",
        itemProductCode: fetchedData[1]?.toString() || "N/A",
        productID: fetchedData[2]?.toString() || "N/A",
        productNotes: fetchedData[3]?.toString() || "N/A",
        productPrice: fetchedData[4]?.toString() || "N/A",
        productDate: date,
        itemState: itemStateDescription,
        distributorID: formatAddress(fetchedData[7]?.toString()),
        retailerID: formatAddress(fetchedData[8]?.toString()),
        consumerID: formatAddress(fetchedData[9]?.toString()),
        manufacturerName: fetchedData[10]?.toString() || "N/A",
        manufacturerInformation: fetchedData[11]?.toString() || "N/A",
      };

      setItemData(formattedData);
    } catch (error) {
      setError(error.message || "An error occurred while fetching item data.");
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
        <button className="custom-button" onClick={handleFetchItem}>Fetch Item</button>

        {itemData && (
          <ul className="text-center">
            {Object.entries(itemData).map(([key, value]) => (
              <li key={key}>
                <strong>{key}</strong>: {value}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FetchItem;

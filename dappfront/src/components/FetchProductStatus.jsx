import React, { useState } from 'react';

const FetchProductStatus = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState(null);
  const [productStatus, setProductStatus] = useState(null);

  // Mapping of item states based on contract enum
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

  const handleFetchProductStatus = async () => {
    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const result = await contract.fetchItemtwo(productCode);

      // Get the item state index and map it to a human-readable description
      const itemStateIndex = parseInt(result[6]);
      const itemStateDescription = itemStates[itemStateIndex] || "Unknown State";

      // Format the response data
      const formattedResult = {
        stockUnit: result[0].toString(),
        productCode: result[1].toString(),
        productID: result[2].toString(),
        productNotes: result[3],
        productPrice: result[4].toString(),
        productDate: new Date(parseInt(result[5]) * 1000).toLocaleString(), // Convert timestamp to readable date
        itemStateDescription, // Add mapped item state
        distributorID: result[7],
        retailerID: result[8],
        consumerID: result[9],
        manufacturerName: result[10],
        manufacturerInformation: result[11],
      };

      setProductStatus(formattedResult);
      setError(null); // Reset errors on success
    } catch (error) {
      setError(error.message || 'An error occurred while fetching product status.');
    }
  };

  return (
    <div className="mx-auto flex flex-col items-center w-full p-4">
      <div className="custom-form">
        {error && <p className="text-red-500">{error}</p>}
        <input
          className="custom-field"
          type="text"
          value={productCode}
          onChange={(e) => setProductCode(e.target.value)}
          placeholder="Product Code"
        />
        <button className="custom-button mt-2" onClick={handleFetchProductStatus}>
          Fetch Product Status
        </button>
        {productStatus && (
          <div className="text-center mt-4 border p-4 rounded-lg shadow-md">
            <p><strong>Stock Unit:</strong> {productStatus.stockUnit}</p>
            <p><strong>Product Code:</strong> {productStatus.productCode}</p>
            <p><strong>Product Notes:</strong> {productStatus.productNotes}</p>
            <p><strong>Product Date:</strong> {productStatus.productDate}</p>
            <p><strong>Item State:</strong> {productStatus.itemStateDescription}</p>
            <p><strong>Distributor ID:</strong> {productStatus.distributorID}</p>
            <p><strong>Retailer ID:</strong> {productStatus.retailerID}</p>
            <p><strong>Consumer ID:</strong> {productStatus.consumerID}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FetchProductStatus;

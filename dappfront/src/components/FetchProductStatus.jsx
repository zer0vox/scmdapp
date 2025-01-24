import React, { useState } from 'react';

const FetchProductStatus = ({ contract }) => {
  const [productCode, setProductCode] = useState('');
  const [error, setError] = useState(null);
  const [productStatus, setProductStatus] = useState(null);

  const handleFetchProductStatus = async () => {
    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const result = await contract.fetchItemtwo(productCode);

      // Convert Big Numbers to strings or numbers
      const formattedResult = {
        forSaleByManufacturerQuantity: result[0].toString(),
        purchasedByDistributorQuantity: result[1].toString(),
        receivedByDistributorQuantity: result[2].toString(),
        forSaleByDistributorQuantity: result[3].toString(),
        purchasedByRetailerQuantity: result[4].toString(),
        receivedByRetailerQuantity: result[5].toString(),
        forSaleByRetailerQuantity: result[6].toString(),
      };

      // Update product status state
      setProductStatus(formattedResult);
    } catch (error) {
      setError(error.message || 'An error occurred while fetching product status.');
    }
  };

  return (
    <div className="mx-auto my-auto py-auto w-full flex flex-row justify-center">
      <div className="custom-form">
      {error && <p>Error: {error}</p>}
        <input
          className="custom-field"
        type="text"
        value={productCode}
        onChange={(e) => setProductCode(e.target.value)}
        placeholder="Product Code"
      />
        <button className="custom-button" onClick={handleFetchProductStatus}>Fetch Product Status</button>
        {productStatus && (
          <div className='text-center'>
            <p>For Sale By Manufacturer Quantity: {productStatus.forSaleByManufacturerQuantity}</p>
            <p>Purchased By Distributor Quantity: {productStatus.purchasedByDistributorQuantity}</p>
            <p>Received By Distributor Quantity: {productStatus.receivedByDistributorQuantity}</p>
            <p>For Sale By Distributor Quantity: {productStatus.forSaleByDistributorQuantity}</p>
            <p>Purchased By Retailer Quantity: {productStatus.purchasedByRetailerQuantity}</p>
            <p>Received By Retailer Quantity: {productStatus.receivedByRetailerQuantity}</p>
            <p>For Sale By Retailer Quantity: {productStatus.forSaleByRetailerQuantity}</p>
          </div>
        )}
      </div>
    
    </div>
  );
};

export default FetchProductStatus;

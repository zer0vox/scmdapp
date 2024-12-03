import React, { useState } from "react";

const FetchItem = ({ contract }) => {
  const [productCode, setProductCode] = useState("");
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState(null);

  const handleFetchItem = async () => {
    try {
      if (!productCode) {
        setError('Product code is required');
        return;
      }

      const result = await contract.fetchItemtwo(productCode);
      console.log(result)
      const timestamp = parseInt(result[3]);
      const date = new Date(timestamp * 1000);
      const formattedDate = date.toDateString();

      const modifiedResult = {
        itemproductcode: result[0]?.toString() || '',
        productNotes: result[1]?.toString() || '',
        productPrice: result[2]?.toString() || '',
        productDate: formattedDate,
        distributorID: result[5]?.toString() || '',
        retailerID: result[6]?.toString() || '',
        manufacturerName: result[4]?.toString() || '',
      };
      console.log('halwa')
      setItemData(modifiedResult);

    } catch (error) {
      setError(error.message || 'An error occurred while fetching item data.');
    }
  };

  return (
    <>
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
          <button className="custom-button" onClick={handleFetchItem}>
            Fetch Item
          </button>

          {
            itemData && Object.keys(itemData).map((key) =>
            (
              <li className="text-center" key={key}>
                <strong>{key}</strong>:<br />{itemData[key]}
              </li>
            )
            )
          }

        </div>
      </div>
    </>
  );
};

export default FetchItem;

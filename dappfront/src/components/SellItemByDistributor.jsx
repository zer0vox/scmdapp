import React, { useState } from "react";

const SellItemByDistributor = ({ contract  ,globalName,
  globalKey,
  entity }) => {
  const [productCode, setProductCode] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const [displaySale, setdisplaySale] = useState('');
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !price || !quantity ) {
        setError("Product code and price are required");
        return;
      }

      // Call the smart contract function to sell the item
      const tx = await contract.sellItemByDistributor(productCode, price);
      await tx.wait();
     

 
    

      // Clear input fields after successful transaction
      setProductCode("");
      setPrice("");
      setError(null); // Clear any previous errors
      setdisplaySale(`Item with product code ${productCode} is now for sale by the distributor for price ${price}`)
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setdisplaySale("An error occurred while processing the transaction.")
    }
  };

  return (
    <>
          <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          {error && <p className="text-red-500">Error: {error}</p>}

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Sell Items
          </h6>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="sell-code"
                >
                  Item Code
                </label>
                <input
                  type="text"
                  id="sell-code"
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
                  htmlFor="sell-price"
                >
                  Selling Price
                </label>
                <input
                  type="text"
                  id="sell-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Product Price"
                />
              </div>
              <button className="custom-button w-full mt-3" type="submit">
                Put up for Sale
              </button>
            </div>
          </form>
          <h4>{displaySale}</h4>
        </div>
      </div>
    </>
  );
};

export default SellItemByDistributor;

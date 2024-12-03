import React, { useState } from "react";

const ReceivedItemByRetailer = ({ contract }) => {
  const [productCode, setProductCode] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const [displayrecieved, setDisplayRecieved] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode||!quantity) {
        setError("Product code is required");
        return;
      }

      const tx = await contract.receivedItemByRetailer(productCode,
        quantity);
      await tx.wait();

      console.log(
        `Item with product code ${productCode} received by retailer`
      );
      setDisplayRecieved(
        `Item with product code ${productCode} received by retailer`
      );
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setDisplayRecieved("An error occurred while processing the transaction.");
    }
  };

  return (
    <>
      <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div className="flex-auto px-4 lg:px-10 py-10 pt-0">

        {error && <p className=" text-red-500">Error: {error}</p>}
        <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
          Receive Items
        </h6>
          <form className="flex flex-col" onSubmit={handleSubmit}>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="receive-code"
                >
                  Item Code
                </label>
                <input
                  type="text"
                  id="receive-code"
                  value={productCode}
                  onChange={(e) => setProductCode(e.target.value)}
                  placeholder="Item Code"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
              </div>
            </div>
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="receive-quantity"
                >
                  Item Quantity
                </label>
                <input
                  type="text"
                  id="receive-quantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="Item Quantity"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                <button className="custom-button w-full mt-3" type="submit">
                  Receive item
                </button>
              </div>
            </div>
          </form>
        <h4>{displayrecieved}</h4>
      </div>
      </div>
    </>
  );
};

export default ReceivedItemByRetailer;

import { useState } from "react";
const ReceivedItemByDistributor = ({ contract ,entity,globalKey, gloablName}) => {
  const [productCode, setProductCode] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const [displayrecieved, setDisplayRecieved] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !quantity) {
        setError("Product code and quantity are required");
        return;
      }

      const tx = await contract.receivedItemByDistributor(
        productCode,
        quantity
      );
      await tx.wait();
     

      console.log(
        `Item with product code ${productCode} received by distributor`
      );
      setDisplayRecieved(`Item with product code ${productCode} received by distributor`)
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setDisplayRecieved("An error occurred while processing the transaction.")
    }
  };

  return (
    <>
  
      <div className="mx-auto w-[50%]">
        {error && <p>Error: {error}</p>}
        <form className="custom-form" onSubmit={handleSubmit}>
          <input
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Product Code"
            className="custom-field"
          />
          <input
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="custom-field"
          />
          <button className="custom-button" type="submit">
            Mark as received
          </button>
        </form>
        <h4>
          {displayrecieved}
        </h4>
      </div>
    </>
  );
};

export default ReceivedItemByDistributor;

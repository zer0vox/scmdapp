import { useState } from "react";
import axios from "axios";
const ShippedItemByManufacturer = ({ contract, globalKey, globalName, entity }) => {
  const [productCode, setProductCode] = useState();
  const [quantity, setQuantity] = useState();
  const [error, setError] = useState(null);
  const [displayShip, setDisplayShip] = useState();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!productCode || !quantity) {
        setError("Product code and quantity are required");
        return;
      }
      console.log('line 16 done')
      const tx = await contract.shippedItemByManufacturer(
        productCode,
        quantity
      );
      await tx.wait();
      console.log('line 22 done')
      try {
        const existingProduct = await axios.get("http://localhost:3001/getfromtable2nd", {
          params: {
            ProductCode: productCode,
            entity: 'd'
          },
        })
        console.log('we are in line 23')
        console.log(existingProduct.data)
        console.log(existingProduct.data.ProductStock, existingProduct.data.ProductCost)

        const existingProductManufacturer = await axios.get("http://localhost:3001/getfromtable2nd", {
          params: {
            ProductCode: productCode,
            entity: entity
          },
        });
        console.log('2 lines below')
        console.log(existingProductManufacturer.data.ProductStock, existingProductManufacturer.data.ProductCost)


        try {


          // Update existing product
          console.log("Request Payload:", {
            id: existingProductManufacturer.data._id,
            globalName: existingProductManufacturer.data.globalName, globalKey: existingProductManufacturer.data.globalKey,
            entity: existingProductManufacturer.data.entity,
            ProductCode: productCode,
            ProductCost: existingProductManufacturer.data.ProductCost,
            ProductStock: existingProductManufacturer.data.ProductStock - existingProduct.data.ProductStock,
            ProductSale: existingProduct.data.ProductCost,
            ProductSaleQuantity: existingProduct.data.ProductStock,
            ProductAddDate: existingProductManufacturer.data.ProductAddDate
          })
          const updateResult = await axios.put(`http://localhost:3001/${existingProductManufacturer.data._id}`, {
            globalName: existingProductManufacturer.data.globalName,
            globalKey: existingProductManufacturer.data.globalKey,
            entity: existingProductManufacturer.data.entity,
            ProductCode: productCode,
            ProductCost: existingProductManufacturer.data.ProductCost,
            ProductStock: existingProductManufacturer.data.ProductStock - existingProduct.data.ProductStock,
            ProductSale: existingProduct.data.ProductCost,
            ProductSaleQuantity: existingProduct.data.ProductStock,
            ProductAddDate: existingProductManufacturer.data.ProductAddDate
          });

          console.log('Data updated with id:', updateResult);



        }

        catch (err) {
          console.log(`we have an error ${err}`)
        }
      }
      catch (err) {
        console.log(`we have an error ${err}`)
      }

      console.log(
        `Item with product code ${productCode} shipped by manufacturer`
      );
      setDisplayShip(`Item with product code ${productCode} shipped by manufacturer`)
    } catch (error) {
      setError(
        error.message || "An error occurred while processing the transaction."
      );
      setDisplayShip("An error occurred while processing the transaction.")
    }
  };

  return (
    <>
      <div className="mx-auto w-[50%]">
        {error && <p>Error: {error}</p>}
        <form className="custom-form" onSubmit={handleSubmit}>
          <input
            type="number"
            value={productCode}
            onChange={(e) => setProductCode(e.target.value)}
            placeholder="Product Code"
            className="custom-field"
          />
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="custom-field"
          />
          <button className="custom-button" type="submit">
            Ship item
          </button>
        </form>
        <h4>{displayShip}</h4>
      </div>
    </>
  );
};

export default ShippedItemByManufacturer;

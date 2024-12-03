import React from 'react';

const Tabular = ({ data }) => {
  return (
    <>
      <div className=" mt-4 pt-5 mx-auto w-[50%]">
        <table className="border-collapse border border-black bg-white w-full">
          <thead>
            <tr className="border-b border-black">
              <th className="border-r border-black p-3 text-center">Name</th>
                        <th className="border-r border-black p-3 text-center">Code</th>
              <th className="border-r border-black p-3 text-center">Start Inventory</th>

              <th className="border-r border-black p-3 text-center">Sold Quantity</th>
              <th className="p-3 text-center">Ending Inventory</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-b border-black">
                <td className="border-r border-black p-3 text-center">{item.ProductName}</td>
                  <td className="border-r border-black p-3 text-center">{item.ProductCode}</td>
                <td className="border-r border-black p-3 text-center">{item.StartInventory}</td>
                <td className="border-r border-black p-3 text-center">{item.ProductSaleQuantity}</td>
                <td className="p-3 text-center">{item.ProductStock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Tabular;

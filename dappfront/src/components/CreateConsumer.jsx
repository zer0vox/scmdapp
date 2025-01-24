import { useState, useEffect } from "react";

const CreateConsumer = ({ contract }) => {
  const [consumerAddress, setConsumerAddress] = useState("");
  let consumerAddressInfo = consumerAddress;
  const [name, setName] = useState("");
  const [livingAddress, setLivingAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [registered, setRegistered] = useState(false);
  const [consumerInfo, setConsumerInfo] = useState(null);
  const [allConsumers, setAllConsumers] = useState([]);
  const [displayConsumer, setDisplayConsumer] = useState("");
  // Add a consumer to the contract
  const addConsumer = async () => {
    try {
      // Call the contract function to add a consumer
      await contract.addConsumer(
        consumerAddress,
        name,
        livingAddress,
        postalCode
      );
      setRegistered(true);
      setConsumerAddress("");
      setName("");
      setLivingAddress("");
      setPostalCode("");
      console.log("Consumer added successfully");
      setDisplayConsumer("Consumer registered");
    } catch (error) {
      console.error("Error adding consumer:", error);
      setDisplayConsumer("Error adding consumer");
    }
  };

  // Remove a consumer from the contract
  const removeConsumer = async () => {
    try {
      // Call the contract function to remove a consumer
      await consumer.removeConsumer(consumerAddress);
      setRegistered(false);
      console.log("Consumer removed successfully");
    } catch (error) {
      console.error("Error removing consumer:", error);
    }
  };

  // Get consumer information by address from the contract
  // Get consumer information by address from the contract
  const getConsumerInfo = async () => {
    try {
      // Call the contract function to get consumer info
      const info = await contract.getConsumer(consumerAddress);

      // Convert BigNumber objects to strings
      const formattedInfo = info.map((item) => {
        if (item._isBigNumber) {
          return item.toString();
        }
        return item;
      });

      setConsumerInfo(formattedInfo);
      console.log("Consumer info retrieved successfully:", formattedInfo);
    } catch (error) {
      console.error("Error getting consumer info:", error);
    }
  };

  const getAllConsumers = async () => {
    try {
      const addresses = await contract.getAllConsumers();
      setAllConsumers(addresses);
      console.log("All consumer addresses retrieved successfully:", addresses);
    } catch (error) {
      console.error("Error getting all consumer addresses:", error);
    }
  };

  useEffect(() => {
    // Any side effects based on dependencies go here if needed
  }, [
    contract,
    consumerAddress,
    name,
    livingAddress,
    postalCode,
    consumerInfo,
  ]);

  return (
    <>
      <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Consumer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Add Consumer
          </h6>

          {/* <div className="w-full  px-4"> */}
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="address"
            >
              Consumer Address
            </label>
            <input
              type="text"
              id="address"
              value={consumerAddress}
              onChange={(e) => setConsumerAddress(e.target.value)}
              placeholder="Enter Consumer Address"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="name"
            >
              Consumer Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter Consumer Name"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="living-address"
            >
              Current Address
            </label>
            <input
              type="text"
              id="living-address"
              value={livingAddress}
              onChange={(e) => setLivingAddress(e.target.value)}
              placeholder="Enter Current Address"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
          </div>
          <div className="relative w-full mb-3">
            <label
              className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
              htmlFor="postal-code"
            >
              Postal Code
            </label>
            <input
              type="text"
              id="living-address"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Postal Code"
              className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
            />
            <button className="custom-button w-full mt-3" onClick={addConsumer}>
              Add Consumer
            </button>
          </div>
          <h4>{displayConsumer}</h4>
        </div>
      </div>

      

      {/* 
        <div className="custom-form">
          <h2>All Consumer Addresses</h2>

          <button className="custom-button" onClick={getAllConsumers}>
            Get All Consumers
          </button>
          <ul>
            {allConsumers.map((address, index) => (
              <li key={index}>{address}</li>
            ))}
          </ul>
        </div> */}
    </>
  );
};

export default CreateConsumer;

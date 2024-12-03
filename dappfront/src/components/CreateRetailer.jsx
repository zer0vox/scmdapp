import React, { useState, useEffect } from "react";

const CreateRetailer = ({ contract }) => {
  const [retailerName, setRetailerName] = useState("");
  const [retailerAddress, setRetailerAddress] = useState("");
  const [registered, setRegistered] = useState(false);
  const [checkRetailerAddress, setCheckRetailerAddress] = useState("");
  const [checkRetailerAddtoRegister, setCheckRetailerAddtoRegister] =
    useState("");
  const [retailerToRegister, setRetailerToRegister] = useState("");
  const [retailAddressCheck, setRetailAddressCheck] = useState("");
  const [retailerNameGet, setRetailerNameGet] = useState("");
  const [accountToCheck, setAccountToCheck] = useState("");
  const [isRetailer, setIsRetailer] = useState(false);
  const [displayGet, setDisplayGet] = useState();
  const [displayAdd, setDisplayAdd] = useState();

  const addRetailerName = async () => {
    try {
      if (!retailerAddress || !retailerName) {
        console.error("Enter the retailer and address name");
        setDisplayAdd("Enter the retailer and address name");
        return;
      }
      const retailers = await contract.getRetailers(retailerAddress);
      if (Array.isArray(retailers) && retailers.includes(retailerName)) {
        console.log("Retailer already exists");
        setDisplayAdd("Retailer exists");
        return;
      }
      const tx = await contract.addRetailer(retailerAddress, retailerName);
      await tx.wait();
      setRegistered(true);
      setRetailerAddress("");
      setRetailerName("");

      console.log("Retailer added successfully");
      setDisplayAdd("Retailer added sucessfully");
    } catch (error) {
      console.error("Retailer was not added:", error);

      setDisplayAdd("Error adding retailer");
    }
  };

  const getRetailers = async () => {
    try {
      if (!checkRetailerAddress) {
        console.error("Enter the address");
        return;
      }
      const retailer = await contract.getRetailers(checkRetailerAddress);
      setCheckRetailerAddress("");
      console.log("Displayed successfully");
      console.log(retailer);
      setDisplayGet(retailer);
    } catch (error) {
      console.error("Error in displaying:", error);
    }
  };

  const registerRetailerName = async () => {
    try {
      if (!retailerToRegister || !checkRetailerAddtoRegister) {
        console.error("Enter the retailer name and address");
        return;
      }

      const retailers = await contract.getRetailers(checkRetailerAddtoRegister);
      setCheckRetailerAddtoRegister("");

      if (Array.isArray(retailers) && retailers.includes(retailerToRegister)) {
        const tx = await contract.registerRetailerName(retailerToRegister);
        await tx.wait();
        console.log(`Retailer: ${retailerToRegister}`);
        await contract.setRetailerName(retailerToRegister);
        console.log(`Retailer set: ${retailerToRegister}`);
      } else {
        console.error(`Retailer ${retailerToRegister} not found in the list.`);
      }
      setRetailerToRegister(" ");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getRetailerName = async (addressToCheck) => {
    try {
      const name = await contract.getRetailerName(addressToCheck);
      setRetailerNameGet(name); // requires the same address where the contract is deployed to check the name
      console.log(`Retailer get: ${name}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkIfRetailer = async (addressToCheck) => {
    try {
      const retailers = await contract.getRetailers(addressToCheck);
      if (retailers.length > 0) {
        setIsRetailer(true);
        console.log(retailers);
      } else {
        setIsRetailer(false);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleCheck = () => {
    if (!accountToCheck) {
      console.log("Enter the account to check");
      return;
    }
    checkIfRetailer(accountToCheck);
  };

  useEffect(() => {
    // Any side effects based on dependencies go here if needed
  }, [
    contract,
    retailerAddress,
    retailerName,
    retailerToRegister,
    checkRetailerAddress,
  ]);

  return (
    <>
      <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Retailer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Add Retailer
          </h6>
          <div className="flex flex-col">
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="address"
                  value={retailerAddress}
                  onChange={(e) => setRetailerAddress(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter User Address"
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  onChange={(e) => setRetailerName(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter Name"
                />
              </div>
              <button
                className="custom-button w-full mt-3"
                onClick={addRetailerName}
              >
                Add Distributor
              </button>
            </div>
          </div>
          <h4>{displayAdd}</h4>
        </div>
        {/* <hr className="mt-0 border-b-2 border-blueGray-300 mb-2" /> */}
        {/* Get Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Get Retailers
          </h6>
          <div className="w-full">
            <div className="flex items-center border-b border-[#3b82f6] py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter Address to Check"
                value={checkRetailerAddress}
                onChange={(e) => setCheckRetailerAddress(e.target.value)}
              />
              <button
                className=" flex-shrink-0 custom-button"
                onClick={getRetailers}
                // className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Get Retailers
              </button>
            </div>
          </div>
          <h4>
            {displayGet &&
              displayGet.map((item, index) => <li key={index}>{item}</li>)}
          </h4>
        </div>

        {/* Register Retailer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Register Retailer
          </h6>
          <div className="flex flex-col">
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="register-address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="register-address"
                  value={checkRetailerAddtoRegister}
                  onChange={(e) =>
                    setCheckRetailerAddtoRegister(e.target.value)
                  }
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter User Address"
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="register-name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="register-name"
                  value={retailerToRegister}
                  onChange={(e) => setRetailerToRegister(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter Manufacturer Name"
                />
              </div>
              <button
                className="custom-button w-full mt-3"
                onClick={registerRetailerName}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Check Registration */}
        {/* <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Check If Retailer Is Registered?
          </h6>
          <div className="flex flex-col">
            <div className="w-full  px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="check-register-address"
                >
                  Address
                </label>
                <input
                  type="text"
                  id="check-register-address"
                  value={accountToCheck}
                  onChange={(e) => setAccountToCheck(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter User Address"
                />
                <button
                  className="custom-button w-full mt-3"
                  onClick={handleCheck}
                >
                  Check
                </button>
              </div>
            </div>
          </div>
          <h4>
            {" "}
            {isRetailer ? (
              <p>The provided address is a Retailer</p>
            ) : (
              <p>The provided address is not a Retailer</p>
            )}
          </h4>
        </div> */}
      </div>
    </>
  );
};

export default CreateRetailer;

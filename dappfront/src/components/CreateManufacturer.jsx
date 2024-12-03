import React, { useState, useEffect } from "react";
const CreateManufacturer = ({ contract }) => {
  //0x3775DE3dC7FF89616195Af150B6F95825DA6CBc2
  const [manufacturerName, setManufacturerName] = useState("");
  const [manufacturerAddress, setManufacturerAddress] = useState("");
  const [registered, setRegistered] = useState(false);
  const [checkmanufacturerAddress, setCheckManufacturerAddress] = useState("");
  const [checkmanufacturerAddtoRegister, setCheckManufacturerAddtoRegister] =
    useState("");
  const [manufacturerToRegsiter, setManufacturerToRegister] = useState("");
  const [manaddresscheck, setManaddressCheck] = useState("");
  const [manNameget, setManNameget] = useState("");
  const [accountToCheck, setAccountToCheck] = useState("");
  const [isManufacturer, setIsManufacturer] = useState(false);
  const [displayValueAdd, setDisplayValueAdd] = useState("");
  const [displayValueGet, setDisplayValueGet] = useState([]);
  const [displayRegistration, setdisplayRegistered] = useState("");
  const addManufacturerName = async () => {
    try {
      if (!manufacturerAddress || !manufacturerName) {
        setDisplayValueAdd("Enter the manufacturer and address name");
        console.error("Enter the manufacturer and address name");
        return;
      }
      const manufacturers = await contract.getManufacturers(
        manufacturerAddress
      );
      if (
        Array.isArray(manufacturers) &&
        manufacturers.includes(manufacturerName)
      ) {
        setDisplayValueAdd("manufacturer already exists");
        console.log("manufacturer already exists");
        return;
      }
      const tx = await contract.addManufacturer(
        manufacturerAddress,
        manufacturerName
      );
      await tx.wait();
      setRegistered(true);
      setManufacturerAddress("");
      setManufacturerName("");

      console.log("Manufacturer added successfully");
      setDisplayValueAdd("Manufacturer added successfully");
    } catch (error) {
      console.error("Manufacturer was not added:", error);
      setDisplayValueAdd("Manufacturer not added");
    }
  };
  const registerManufacturerName = async () => {
    try {
      if (!manufacturerToRegsiter || !checkmanufacturerAddtoRegister) {
        console.error("Enter the manufacturer name and address");
        return;
      }

      const manufacturers = await contract.getManufacturers(
        checkmanufacturerAddtoRegister
      );
      setCheckManufacturerAddtoRegister("");

      if (
        Array.isArray(manufacturers) &&
        manufacturers.includes(manufacturerToRegsiter)
      ) {
        const tx = await contract.registerManufacturerName(
          manufacturerToRegsiter
        );
        await tx.wait();
        console.log(`Manufacturer: ${manufacturerToRegsiter}`);
        await contract.setManufacturerName(manufacturerToRegsiter);
        console.log(`Manufacturer set:${manufacturerToRegsiter}`);
      } else {
        console.error(
          `Manufacturer ${manufacturerToRegsiter} not found in the list.`
        );
      }
    } catch (error) {
      console.error("error:", error);
    }
  };
  const getManufacturers = async () => {
    try {
      if (!checkmanufacturerAddress) {
        console.error("Enter the address");
        return;
      }
      const manufacturer = await contract.getManufacturers(
        checkmanufacturerAddress
      );
      setCheckManufacturerAddress("");
      console.log("Displayed sucessfully");
      console.log(manufacturer);
      setDisplayValueGet(manufacturer);
    } catch (error) {
      console.error("Error in displaying:", error);
    }
  };

  const getManufacturerName = async (addressToCheck) => {
    try {
      const name = await contract.getManufacturerName(addressToCheck);
      setManNameget(name); // requires the same address where the contract is deployed to check the name
      console.log(`Manufacturer get:${name}`);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const checkIfManufacturer = async (addressToCheck) => {
    try {
      const manufacturers = await contract.getManufacturers(addressToCheck);
      if (manufacturers.length > 0) {
        setIsManufacturer(true);
        console.log(manufacturers);
      } else {
        setIsManufacturer(false);
      }
    } catch (error) {
      console.error("error:", error);
    }
  };

  const handelCheck = () => {
    if (!accountToCheck) {
      console.log("Enter the account to check");
      return;
    }
    checkIfManufacturer(accountToCheck);
  };

  const checkIsmanufacturerNameRegistered = async () => {
    try {
      if (!manufacturerAddress || !manufacturerName) {
        console.error("Enter the manufacturer name and address");
        return;
      }
      const isRegistered = await contract.isManufacturerNameRegistered(
        manufacturerAddress,
        manufacturerName
      );

      if (isRegistered) {
        console.log(`Manufacturer name ${manufacturerName} is registered`);
        setdisplayRegistered(
          `Manufacturer name ${manufacturerName} is registered`
        );
      } else {
        console.log(`Manufacturer name ${manufacturerName} is not registered`);
        setdisplayRegistered(
          `Manufacturer name ${manufacturerName} is not registered`
        );
      }
    } catch (error) {
      console.error("Error checking:", error);
    }
  };

  useEffect(() => {
    // Any side effects based on dependencies go here if needed
  }, [
    contract,
    manufacturerAddress,
    manufacturerName,
    manufacturerToRegsiter,
    checkmanufacturerAddress,
  ]);

  return (
    <>
      <div className="bg-white relative flex flex-col pt-4 min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
        {/* Add Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Add Manufacturer
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
                  value={manufacturerAddress}
                  onChange={(e) => setManufacturerAddress(e.target.value)}
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
                  onChange={(e) => setManufacturerName(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter Name"
                />
              </div>
              <button
                className="custom-button w-full mt-3"
                onClick={addManufacturerName}
              >
                Add manufacturer
              </button>
            </div>
          </div>
          <h4>{displayValueAdd}</h4>
        </div>
        {/* <hr className="mt-0 border-b-2 border-blueGray-300 mb-2" /> */}
        {/* Get Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-5 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Get Manufacturer
          </h6>
          <div className="w-full">
            <div className="flex items-center border-b border-[#3b82f6] py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Enter Address to Check"
                value={checkmanufacturerAddress}
                onChange={(e) => setCheckManufacturerAddress(e.target.value)}
              />
              <button
                className=" flex-shrink-0 custom-button"
                onClick={getManufacturers}
                // className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
              >
                Get manufacturers
              </button>
            </div>
          </div>
          <h4>
            {displayValueGet.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </h4>
        </div>

        {/* Register Manufacturer */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Register Manufacturer
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
                  value={checkmanufacturerAddtoRegister}
                  onChange={(e) =>
                    setCheckManufacturerAddtoRegister(e.target.value)
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
                  value={manufacturerToRegsiter}
                  onChange={(e) => setManufacturerToRegister(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter Manufacturer Name"
                />
              </div>
              <button
                className="custom-button w-full mt-3"
                onClick={registerManufacturerName}
              >
                Register
              </button>
            </div>
          </div>
        </div>

        {/* Check Registration */}
        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            Check If Manufacturer Is Register?
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
                  value={manufacturerAddress}
                  onChange={(e) => setManufacturerAddress(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter User Address"
                />
              </div>
            </div>
            <div className="w-full px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="check-register-name"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="check-register-name"
                  value={manufacturerName}
                  onChange={(e) => setManufacturerName(e.target.value)}
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Enter Manufacturer Name"
                />
              </div>
              <button
                className="custom-button w-full mt-3"
                onClick={registerManufacturerName}
              >
                Check
              </button>
            </div>
          </div>
          <h4>{displayRegistration}</h4>
        </div>
      </div>
    </>
  );
};
export default CreateManufacturer;

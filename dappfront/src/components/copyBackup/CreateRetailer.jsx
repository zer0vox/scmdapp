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
        setDisplayAdd("Enter the retailer and address name")
        return;
      }
      const retailers = await contract.getRetailers(retailerAddress);
      if (Array.isArray(retailers) && retailers.includes(retailerName)) {
        console.log("Retailer already exists");
        setDisplayAdd("Retailer exists")
        return;
      }
      const tx = await contract.addRetailer(retailerAddress, retailerName);
      await tx.wait();
      setRegistered(true);
      setRetailerAddress("");
      setRetailerName("");

      console.log("Retailer added successfully");
      setDisplayAdd("Retailer added sucessfully")
    } catch (error) {
      console.error("Retailer was not added:", error);

      setDisplayAdd("Error adding retailer")
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
      setDisplayGet(retailer)
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
      <div className="mx-auto w-[50%]">
        <div className="custom-form">
          <h2>Add Retailer</h2>
          <input
            value={retailerAddress}
            onChange={(e) => setRetailerAddress(e.target.value)}
            placeholder="Enter retailer address"
            className="custom-field"
          />
          <input
            value={retailerName}
            onChange={(e) => setRetailerName(e.target.value)}
            placeholder="Enter the retailer name"
            className="custom-field"
          />
          <button className="custom-button" onClick={addRetailerName}>
            Add Retailer
          </button>
          <h4>{displayAdd}</h4>
        </div>
        <div className="custom-form">
          <h2>Get Retailers</h2>
          <input
            value={checkRetailerAddress}
            onChange={(e) => setCheckRetailerAddress(e.target.value)}
            placeholder="Enter the address to check "
            className="custom-field"
          />
          <button className="custom-button" onClick={getRetailers}>
            Get Retailers
          </button>
          <h4>{displayGet && displayGet.map((item, index) => (
            <li key={index}>{item}</li>
          )
          )}</h4>
        </div>

        <div className="custom-form">
          <h2>Register Retailer</h2>
          <input
            value={checkRetailerAddtoRegister}
            onChange={(e) => setCheckRetailerAddtoRegister(e.target.value)}
            placeholder="Enter the address"
            className="custom-field"
          />
          <input
            value={retailerToRegister}
            onChange={(e) => setRetailerToRegister(e.target.value)}
            placeholder="Enter retailer name"
            className="custom-field"
          />
          <button className="custom-button" onClick={registerRetailerName}>
            Register
          </button>
        </div>

        {/* <div className="custom-form">
          <h2>Get Retailer name</h2>
          <input
            value={retailAddressCheck}
            onChange={(e) => setRetailAddressCheck(e.target.value)}
            placeholder="Enter the retailer address:"
            className="custom-field"
          />
          <button
            className="custom-button"
            onClick={() => getRetailerName(retailAddressCheck)}
          >
            Enter address
          </button>
        </div> */}

        <div className="custom-form">
          <h2>Check if address is Retailer</h2>
          <input
            value={accountToCheck}
            onChange={(e) => setAccountToCheck(e.target.value)}
            placeholder="Enter the account to check"
            className="custom-field"
          />
          <button className="custom-button" onClick={handleCheck}>
            Check Entity
          </button>
          {isRetailer ? (
            <p>The provided address is a Retailer</p>
          ) : (
            <p>The provided address is not a Retailer</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateRetailer;

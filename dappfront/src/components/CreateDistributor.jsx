import React, { useState, useEffect } from "react";

const CreateDistributor = ({ contract }) => {
  const [distributorAddress, setDistributorAddress] = useState("");
  const [distributorName, setDistributorName] = useState("");
  const [addDistributor, setAddDistributor] = useState(false);
  const [checkDistributorAddress, setCheckDistributorAddress] = useState("");
  const [distributorToRegister, setDistributorToRegister] = useState("");
  const [checkdistributorAddtoRegister, setCheckDistributorAddtoRegister] =  useState("");
  const [disaddresscheck, setDisAddressCheck] = useState("");
  const [disNameGet, setDisNameGet] = useState("");
  const [accountToCheck, setAccountToCheck] = useState("");
  const [isDistributor, setIsDistributor] = useState(false);
  const [displayValueAdd, setDisplayValueAdd] = useState("");
  const [displayValueGet, setDisplayValueGet] = useState([]);
  const [displayGet, setDisplayGet] = useState();
  const [displayAdd, setDisplayAdd] = useState();


  const addDistributorName = async () => {
    try {
      if (!distributorAddress || !distributorName) {
        setDisplayValueAdd("Enter the distributor name and address");
        console.log("Enter the distributor name and address");
        return;
      }
      const distributors = await contract.getDistributors(distributorAddress);
      if (
        Array.isArray(distributors) &&
        distributors.includes(distributorName)
      ) {
        console.error(
          `Distributor with name ${distributorName} already exists`
        );
        return;
      }

      const tx = await contract.addDistributor(
        distributorAddress,
        distributorName
      );
      await tx.wait();
      setAddDistributor(true);
      setDistributorAddress("");
      setDistributorName(" ");

      // await registerDistributorName(distributorAddress, distributorName)
      setDisplayValueAdd("Distriubutor added Successfully");
      console.log("Distributor added Successfully");
      setDisplayAdd("Distributor added sucessfully")
      return;
    } catch (error) {
      setDisplayValueAdd("Distriubutor was not added");
      console.error("Distributor was not added:", error);
    }
    setDisplayAdd("Distributor not added")
  };

  const getDistributors = async () => {
    try {
      if (!checkDistributorAddress) {
        setDisplayValueAdd("Enter the distributor address to check");
        console.error("Enter the distributor address to check ");
        return;
      }
      const distributor = await contract.getDistributors(
        checkDistributorAddress
      );
      setCheckDistributorAddress(" ");
      console.log("Displayed successFully");
      console.log(distributor);
      setDisplayGet(distributor);

    } catch (error) {
      console.error("Error in displaying:", error);
    }
  };
// checkdistributorAddtoRegister, distributorToRegister
  const registerDistributorName = async () => {
    try {
      if (!distributorToRegister || !checkdistributorAddtoRegister) {
        setDisplayValueAdd("Enter the name and address of the distributor to register");
        console.error(
          "Enter the name and address of the distributor to register"
        );
        return;
      }
      const distributors = await contract.getDistributors(
        checkdistributorAddtoRegister
      );
      setCheckDistributorAddtoRegister("");
      if (
        Array.isArray(distributors) &&
        distributors.includes(distributorToRegister)
      ) {
        const register = await contract.registerDistributorName(
          distributorToRegister
        );
        await register.wait();
        setDisplayValueAdd(`Distributor:${distributorToRegister} is registered`);
        console.log(`Distributor:${distributorToRegister}`);
        await contract.setDistributorName(distributorToRegister);
        console.log(`Distriubutor is set:${distributorToRegister}`);
      } else {
        setDisplayValueAdd(`Distributor:${distributorToRegister} is not found`);
        console.error(
          `Distributor ${distributorToRegister} not found in the list.`
        );
      }
      setDistributorToRegister("");
    } catch (error) {
      console.log("error:", error);
    }
  };

  const getDistributorName = async (addressToCheck) => {
    try {
      if (!addressToCheck) {
        console.error("Enter the address");
        return;
      }
      const name = await contract.getDistributorName(addressToCheck);
      setDisNameGet(name);
      console.log(`Distributor for address ${addressToCheck}: ${name}`);
    } catch (error) {
      console.log("error:", error);
    }
  };

  const checkIfDistributor = async (addressToCheck) => {
    try {
      const distributors = await contract.getDistributors(addressToCheck);
      if (distributors.length > 0) {
        setIsDistributor(true);
        console.log(distributors);
      } else {
        setIsDistributor(false);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  // const handleCheck = () => {
  //   if (!accountToCheck) {
  //     console.log("Enter the account to check");
  //     return;
  //   }
  //   checkIfDistributor(accountToCheck);
  // };

  const checkIsDistributorNameRegistered = async () => {
    try {
      if (!distributorAddress || !distributorName) {
        console.error("Enter the distributor name and address");
        return;
      }
      const isRegistered = await contract.isDistributorNameRegistered(
        distributorAddress,
        distributorName
      );

      if (isRegistered) {
        console.log(`Distributor name ${distributorName} is registered`);
      } else {
        console.log(`Distributor name ${distributorName} is not registered`);
      }
    } catch (error) {
      console.error("Error checking:", error);
    }
  };

  useEffect(() => { }, [
    contract,
    distributorAddress,
    distributorName,
    distributorToRegister,
    disaddresscheck,
    checkDistributorAddress,
  ]);

  return (
    <>
      <div className="mx-auto w-[50%]">
        <div className="custom-form">
          <h2>Add Distributor</h2>
          <input
            value={distributorAddress}
            onChange={(e) => setDistributorAddress(e.target.value)}
            placeholder="Enter the distributor address"
            className="custom-field"
          />
          <input
            value={distributorName}
            onChange={(e) => setDistributorName(e.target.value)}
            placeholder="Enter the distributor Name"
            className="custom-field"
          />
          <button className="custom-button" onClick={addDistributorName}>
            Add Distributor
          </button>
          <h4>{displayAdd}</h4>
        </div>

        <div className="custom-form">
          <h2>Get Distributor</h2>
          <input
            value={checkDistributorAddress}
            onChange={(e) => setCheckDistributorAddress(e.target.value)}
            placeholder="Enter the address to get its distributor"
            className="custom-field"
          />
          <button className="custom-button" onClick={getDistributors}>
            Get Distributors
          </button>
          <h4>{displayGet && displayGet.map((item, index) => (
            <li key={index}>{item}</li>
          )
          )}</h4>
        </div>

        <div className="custom-form">
          <h2>Register Distributor</h2>
          <input
            value={checkdistributorAddtoRegister}
            onChange={(e) => setCheckDistributorAddtoRegister(e.target.value)}
            placeholder="Enter the address"
            className="custom-field"
          />
          <input
            value={distributorToRegister}
            onChange={(e) => setDistributorToRegister(e.target.value)}
            placeholder="distributor to register"
            className="custom-field"
          />
          <button className="custom-button" onClick={registerDistributorName}>
            Register Distributor
          </button>
        </div>

        {/* <div className="custom-form">
          <h2>Get Distributor Name</h2>
          <input
            value={disaddresscheck}
            onChange={(e) => setDisAddressCheck(e.target.value)}
            placeholder="distributor address"
            className="custom-field"
          />
          <button
            className="custom-button"
            onClick={() => getDistributorName(disaddresscheck)}
          >
            Enter the distributor address
          </button>
        </div> */}

        {/* <div className="custom-form">
          <h2>Check if address is distributor</h2>
          <input
            value={accountToCheck}
            onChange={(e) => setAccountToCheck(e.target.value)}
            placeholder="account to check"
            className="custom-field"
          />
          <button className="custom-button" onClick={handleCheck}>
            Check Distributor
          </button>
          {isDistributor ? (
            <p>The provided address is a Distributor</p>
          ) : (
            <p>The provided address is not Distributor</p>
          )}
        </div> */}

        <div className="custom-form">
          <h2>Check if distributor is registered or not</h2>

          <input
            value={distributorAddress}
            onChange={(e) => setDistributorAddress(e.target.value)}
            placeholder="Enter distributor address"
            className="custom-field"
          />
          <input
            value={distributorName}
            onChange={(e) => setDistributorName(e.target.value)}
            placeholder="Distributor Name"
            className="custom-field"
          />
          <button
            className="custom-button"
            onClick={checkIsDistributorNameRegistered}
          >
            {" "}
            Check registered distributor
          </button>
        </div>
      </div>
    </>
  );
};

export default CreateDistributor;

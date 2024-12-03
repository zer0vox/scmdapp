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
      <div className="">
        
        <div className="custom-form">
          <h2>Add manufacturer</h2>
          <input
            value={manufacturerAddress}
            onChange={(e) => setManufacturerAddress(e.target.value)}
            placeholder="Enter manufacturer address"
            className="custom-field"
          />
          <input
            value={manufacturerName}
            onChange={(e) => setManufacturerName(e.target.value)}
            placeholder="Enter the manufacturer name"
            className="custom-field"
          />
          <button className="custom-button" onClick={addManufacturerName}>
            Add manufacturer
          </button>
          <h4>{displayValueAdd}</h4>
        </div>
  
        <div className="custom-form">
          <h2>Get Manufacturers</h2>
          <input
            value={checkmanufacturerAddress}
            onChange={(e) => setCheckManufacturerAddress(e.target.value)}
            placeholder="Enter the address to check "
            className="custom-field"
          />
          <button className="custom-button" onClick={getManufacturers}>
            Get manufacturers
          </button>
          <h4>
            {displayValueGet.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </h4>
        </div>

        <div className="custom-form">
          <h2>Register Manufacturer</h2>
          <input
            value={checkmanufacturerAddtoRegister}
            onChange={(e) => setCheckManufacturerAddtoRegister(e.target.value)}
            placeholder="Enter the address"
            className="custom-field"
          />
          <input
            value={manufacturerToRegsiter}
            onChange={(e) => setManufacturerToRegister(e.target.value)}
            placeholder="Enter manufacturer name"
            className="custom-field"
          />
          <button onClick={registerManufacturerName}>Register</button>
        </div>
        {/* <div className="custom-form">
          <h2>Get manufacuter name</h2>
          <input
            value={manaddresscheck}
            onChange={(e) => setManaddressCheck(e.target.value)}
            placeholder="Enter the manufacturer address:"
            className="custom-field"
          />
          <button className="custom-button" onClick={() => getManufacturerName(manaddresscheck)}>
            Enter address
          </button>
        </div> */}
        {/* 
        <div className="custom-form">
          <h2>Check if address is Manufacturer</h2>
          <input
            value={accountToCheck}
            onChange={(e) => setAccountToCheck(e.target.value)}
            placeholder="Enter the account to check"
            className="custom-field"
          />
          <button className="custom-button" onClick={handelCheck}>Check Entity</button>
          {isManufacturer ? (
            <p>The provided address is a Manufacturer</p>
          ) : (
            <p>The provided address is not a Manufacturer</p>
          )}
        </div> */}

        <div className="custom-form">
          <h2>Check if manufacturer is registered or not</h2>
          <input
            value={manufacturerAddress}
            onChange={(e) => setManufacturerAddress(e.target.value)}
            placeholder="Enter manufacturer address"
            className="custom-field"
          />
          <input
            value={manufacturerName}
            onChange={(e) => setManufacturerName(e.target.value)}
            placeholder="Manufacturer Name"
            className="custom-field"
          />
          <button
            className="custom-button"
            onClick={checkIsmanufacturerNameRegistered}
          >
            {" "}
            Check registered manufacturer
          </button>
          <h4>{displayRegistration}</h4>
        </div>
      </div>
    </>
  );
};
export default CreateManufacturer;

{
  /*}


import React, { useState, useEffect } from 'react';

const CreateUser = ({ contract, account }) => {
    const [entityType, setEntityType] = useState('');
    const [entityName, setEntityName] = useState('');
    const [entityAddress, setEntityAddress] = useState('');
    const [registered, setRegistered] = useState(false);
    const [userEntities, setUserEntities] = useState([]);
    const [isManufacturer, setIsManufacturer] = useState(false);
    const [checkEntityAddress, setCheckEntityAddress]=useState("");
    

    useEffect(() => {
        if (account && contract) {
            fetchUserEntities();
        }
    }, [account, contract]);

    const registerEntity = async () => {
        try {
            if (!entityType || !entityName || !entityAddress) {
                console.error('Select entity type, enter name, and provide an address');
                return;
            }

            let tx;
            switch (entityType) {
                case 'Manufacturer':
                    tx = await contract.registerManufacturerName(entityName);
                    break;
                case 'Distributor':
                    tx = await contract.registerDistributorName(entityName);
                    break;
                case 'Retailer':
                    tx = await contract.registerRetailerName(entityName);
                    break;
                default:
                    console.error('Select a valid entity type');
                    return;
            }

            await tx.wait();
            setRegistered(true);
            fetchUserEntities();
            console.log(`${entityType} name registered successfully!`);
        } catch (error) {
            console.error('Error registering entity name:', error);
        }
    };

    const fetchUserEntities = async () => {
        try {
            let entities = [];
            switch (entityType) {
                case 'Manufacturer':
                    entities = await contract.getManufacturers(account);
                    break;
                case 'Distributor':
                    entities = await contract.getDistributors(account);
                    break;
                case 'Retailer':
                    entities = await contract.getRetailers(account);
                    break;
                default:
                    console.error('Select a valid entity type');
                    return;
            }

            setUserEntities(entities);
        } catch (error) {
            console.error('Error fetching user entities:', error);
        }
    };


    const checkIfManufacturer = async (addressToCheck) => {
        try {
            const isEntity = await contract.isManufacturer(addressToCheck);
            setIsManufacturer(isEntity); // Set the state directly
        } catch (error) {
            console.error("Error checking entity:", error);
            setIsManufacturer(false); // Set to false on error
        }
    };


    const checkEntity = async () => {
        try {
            if (!checkEntityAddress) {
                console.error('Enter an entity address to check');
                return;
            }
    
            await checkIfManufacturer(checkEntityAddress);
    
            if (isManufacturer) {
                console.log(`Address ${entityAddress} is a Manufacturer`);
            } else {
                console.log(`Address ${entityAddress} is not a Manufacturer`);
            }
        } catch (error) {
            console.error('Error checking entity:', error);
        }
    };
    
    
    



    

    return (
        <div>
            <h2>Register Entity Name</h2>
            <select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
                <option value="">Select Entity Type</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
            </select>
            <input
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="Enter entity name"
            />
            <input
                value={entityAddress}
                onChange={(e) => setEntityAddress(e.target.value)}
                placeholder="Enter entity address"
            />
            <button onClick={registerEntity}>Register</button>

            <h2>User's Entities</h2>
            <ul>
                {userEntities.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>

            <h2>Check if Address is Manufacturer</h2>
            <input value={checkEntityAddress}
             onChange={(e)=>setCheckEntityAddress(e.target.value)}
             placeholder='Enter the address to check entity' />
            <button onClick={checkEntity}>Check Entity</button>
            {isManufacturer && <p>The provided address is a Manufacturer</p>}
            {!isManufacturer && <p>The provided address is not a Manufacturer</p>}
        </div>
    );
};

export default CreateUser;
*/
}
{
  /*
import React, { useState, useEffect } from 'react';

const CreateUser = ({ contract, account }) => {
    const [entityType, setEntityType] = useState('');
    const [entityName, setEntityName] = useState('');
    const [registered, setRegistered] = useState(false);
    const [userEntities, setUserEntities] = useState([]);

    useEffect(() => {
        if (account && contract) {
            fetchUserEntities();
        }
    }, [account, contract]);

    const registerEntity = async () => {
        try {
            if (!entityType || !entityName) {
                console.error('Select entity type and enter name');
                return;
            }

            let tx;
            switch (entityType) {
                case 'Manufacturer':
                    tx = await contract.registerManufacturerName(entityName);
                    break;
                case 'Distributor':
                    tx = await contract.registerDistributorName(entityName);
                    break;
                case 'Retailer':
                    tx = await contract.registerRetailerName(entityName);
                    break;
                default:
                    console.error('Select a valid entity type');
                    return;
            }

            await tx.wait();
            setRegistered(true);
            fetchUserEntities();
            console.log(`${entityType} name registered successfully!`);
        } catch (error) {
            console.error('Error registering entity name:', error);
        }
    };

    const fetchUserEntities = async () => {
        try {
            let entities = [];
            switch (entityType) {
                case 'Manufacturer':
                    entities = await contract.getManufacturers(account);
                    break;
                case 'Distributor':
                    entities = await contract.getDistributors(account);
                    break;
                case 'Retailer':
                    entities = await contract.getRetailers(account);
                    break;
                default:
                    console.error('Select a valid entity type');
                    return;
            }

            setUserEntities(entities);
        } catch (error) {
            console.error('Error fetching user entities:', error);
        }
    };

    return (
        <div>
            <h2>Register Entity Name</h2>
            <select value={entityType} onChange={(e) => setEntityType(e.target.value)}>
                <option value="">Select Entity Type</option>
                <option value="Manufacturer">Manufacturer</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
            </select>
            <input
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                placeholder="Enter entity name"
            />
            <button onClick={registerEntity}>Register</button>

            <h2>User's Entities</h2>
            <ul>
                {userEntities.map((name, index) => (
                    <li key={index}>{name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CreateUser;
*/
}

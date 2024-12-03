import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import Dropdown from 'react-dropdown';
// import 'react-dropdown/style.css';

const Login = ({
  account,
  setAuthenticated,
  auth,
  contract,
  setGlobalKey,
  setGlobalName,
  setEntity,
  entity,
}) => {
  setEntity("");
  const [name, setname] = useState("");
  const [privatekey, setPrivateKey] = useState(account);
  const [aspect, setAspect] = useState("");
  const [pageToChange, setPageToChange] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [privateKeyInitial, setPrivateKeyInitial] = useState(account);
  const [hasEditedPrivateKey, setHasEditedPrivateKey] = useState(false);
  const [logInError, setLogInError] = useState("");
  const [changeToStatus, setChangeToStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const RegisterAndNavigate = async () => {
      try {
        if (changeToStatus) {
          // console.log('hereehehlkehlkwla')

          switch (pageToChange) {
            case "d": {
              await registerDistributorName();
              navigate("/distributor");
              break;
            }
            case "m": {
              await registerManufacturerName();
              navigate("/manufacturer");

              break;
            }
            case "r": {
              await registerRetailerName();
              navigate("/retailer");
              break;
            }
            case "c": {
              navigate("/consumer");
              break;
            }
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    RegisterAndNavigate();
  }, [changeToStatus, navigate]);

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
    setHasEditedPrivateKey(true);
  };

  // privatekey, distributorToRegister
  const registerDistributorName = async () => {
    try {
      if (!name || !privatekey) {
        console.error(
          "Enter the name and address of the distributor to register"
        );
        return;
      }
      const distributors = await contract.getDistributors(privatekey);

      if (Array.isArray(distributors) && distributors.includes(name)) {
        const register = await contract.registerDistributorName(name);
        await register.wait();

        console.log(`Distributor:${name}`);
        await contract.setDistributorName(name);
      } else {
        console.error(`Distributor ${name} not found in the list.`);
      }
    } catch (error) {
      console.log("error:", error);
    }
    setEntity("d");
  };

  const registerManufacturerName = async () => {
    try {
      if (!name || !privatekey) {
        console.error("Enter the manufacturer name and address");
        return;
      }

      const manufacturers = await contract.getManufacturers(privatekey);

      if (Array.isArray(manufacturers) && manufacturers.includes(name)) {
        const tx = await contract.registerManufacturerName(name);
        await tx.wait();
        console.log(`Manufacturer: ${name}`);
        await contract.setManufacturerName(name);

        console.log(`Manufacturer set:${name}`);
      } else {
        console.error(`Manufacturer ${name} not found in the list.`);
      }
    } catch (error) {
      console.error("error:", error);
    }
    setEntity("m");
  };

  const registerRetailerName = async () => {
    try {
      if (!name || !privatekey) {
        console.error("Enter the retailer name and address");
        return;
      }

      const retailers = await contract.getRetailers(privatekey);

      if (Array.isArray(retailers) && retailers.includes(name)) {
        const tx = await contract.registerRetailerName(name);
        await tx.wait();
        console.log(`Retailer: ${name}`);
        await contract.setRetailerName(name);
        console.log(`Retailer set: ${name}`);
      } else {
        console.error(`Retailer ${name} not found in the list.`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
    setEntity("r");
  };

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    ``;
    try {
      const result = await axios.post("http://localhost:3001/login", {
        privatekey,
        name,
        aspect,
        password,
      });
      console.log(result);
      if (result.data === "done") {
        console.log(auth);
        setAuthenticated("auth");
        console.log("set to true");
        console.log(auth);
        console.log("done here  " + aspect);
        setGlobalName(name);
        setGlobalKey(privatekey);
        setPageToChange(aspect);

        setChangeToStatus(true);
      } else {
        setLogInError("Incorrect Credentials, Please Try Again");
        console.log("noauth here");
        console.log(auth);
      }

      console.log(`this value shall be use ${pageToChange}`);
    } catch (err) {
      console.log(err);

      console.log(auth);
      setLogInError("Server Busy, Please Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-[20vh]">
        <h1 className="hidden absolute md:block top-6 left-[45%] z-10 text-4xl font-bold">
          User LogIn
        </h1>
        <div className="custom-form mx-auto w-[70%] bg-green-200">
          <label htmlFor="privatekey" className="input-label">
            Private Key
          </label>
          <input
            value={
              privatekey !== "" || hasEditedPrivateKey
                ? privatekey
                : privateKeyInitial
            }
            onChange={handlePrivateKeyChange}
            id="privatekey"
            placeholder="Private Key"
            className="custom-field"
          />

          <label htmlFor="name" className="input-label">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setname(e.target.value)}
            id="name"
            placeholder="Name"
            className="custom-field"
          />

          <label htmlFor="aspect" className="input-label">
            Aspect
          </label>
          <select
            value={aspect}
            id="aspect"
            onChange={(e) => setAspect(e.target.value)}
            className="custom-field"
          >
            <option value="m">Manufacturer</option>
            <option value="d">Distributor</option>
            <option value="r">Retailer</option>
            <option value="c">Consumer</option>
          </select>

          <label htmlFor="password" className="input-label">
            Password
          </label>
          <input
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            placeholder="Password"
            className="custom-field"
          />
          <button className="custom-button w-full" onClick={login}>
            LogIn
          </button>
          <div className="input-label text-red-500">{logInError}</div>
          <div className="mt-2">
            Do not Have a Account? <t></t>
            <Link
              className="block md:inline-block text-center bg-white rounded-lg px-3 py-2 hover:bg-slate-200 hover:text-red-500"
              to="/signup"
            >
              Signup
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login;

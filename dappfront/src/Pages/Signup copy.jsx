import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
const Signup = ({ contract, account }) => {
  const [name, setname] = useState("");
  const [privatekey, setPrivateKey] = useState(account);
  const [aspect, setAspect] = useState("");
  const [password, setPassword] = useState("");
  const [privateKeyInitial, setPrivateKeyInitial] = useState(account);
  const [hasEditedPrivateKey, setHasEditedPrivateKey] = useState(false);
  const [changeToStatus, setChangeToStatus] = useState(false);
  const navigate = useNavigate();
  let signUpError = "";
  useEffect(() => {
    if (changeToStatus) {
      navigate("/login");
    }
  }, [changeToStatus, navigate]);
  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
    setHasEditedPrivateKey(true);
  };

  const addDistributorName = async () => {
    try {
      if (!privatekey || !name) {
        console.log("Enter the distributor name and address");
        return;
      }
      const distributors = await contract.getDistributors(privatekey);
      if (Array.isArray(distributors) && distributors.includes(name)) {
        console.error(`Distributor with name ${name} already exists`);
        return;
      }

      const tx = await contract.addDistributor(privatekey, name);
      await tx.wait();
      setname("");

      console.log("Distributor added Successfully");
      setChangeToStatus(true);
      return;
    } catch (error) {
      console.error("Distributor was not added:", error);
    }
  };

  const addManufacturerName = async () => {
    try {
      if (!privatekey || !name) {
        setDisplayValueAdd("Enter the manufacturer and address name");
        console.error("Enter the manufacturer and address name");
        return;
      }
      const manufacturers = await contract.getManufacturers(privatekey);
      if (Array.isArray(manufacturers) && manufacturers.includes(name)) {
        console.log("manufacturer already exists");
        return;
      }
      const tx = await contract.addManufacturer(privatekey, name);
      await tx.wait();
      setname("");

      console.log("Manufacturer added successfully");
      setChangeToStatus(true);
    } catch (error) {
      console.error("Manufacturer was not added:", error);
    }
  };

  const addRetailerName = async () => {
    try {
      if (!privatekey || !name) {
        console.error("Enter the retailer and address name");
        return;
      }
      const retailers = await contract.getRetailers(privatekey);
      if (Array.isArray(retailers) && retailers.includes(name)) {
        console.log("Retailer already exists");
        return;
      }
      const tx = await contract.addRetailer(privatekey, name);
      await tx.wait();
      setname("");
      setChangeToStatus(true);
      console.log("Retailer added successfully");
    } catch (error) {
      console.error("Retailer was not added:", error);
    }
  };

  const signup = async (e) => {
    // e.preventDefault();

    try {
      const result = await axios.post("http://localhost:3001/register", {
        privatekey,
        name,
        aspect,
        password,
      });
      console.log(result);
      switch (aspect) {
        case "m": {
          addManufacturerName();
          break;
        }

        case "d": {
          addDistributorName();
          break;
        }
        case "r": {
          addRetailerName();
          break;
        }
        default: {
          console.log("ok");
          break;
        }
      }
    } catch (err) {
      signUpError = "Sorry Could not Sign Up";
      console.log(err);
    }
  };
  return (
    <>
      <div className="mt-[20vh]">
        <h1 className="hidden absolute md:block top-6 left-[42%] z-10 text-4xl font-bold">
          Create New User
        </h1>
        <div className="custom-form mx-auto w-[70%] bg-red-200">
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
          {/* <input
            value={aspect}
            onChange={(e) => setAspect(e.target.value)}
            placeholder="M/R/D/C"
            className="custom-field"
          /> */}

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
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="custom-field"
          />

          <button className="custom-button w-full" onClick={signup}>
            Sign Up
          </button>
          <div className="input-label text-orange-500">{signUpError}</div>
          <div className="mt-2">
            Already Have an account? <t></t>
            <Link
              className="block md:inline-block text-center bg-white rounded-lg px-3 py-2 hover:bg-slate-200 hover:text-red-500"
              to="/login"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
export default Signup;

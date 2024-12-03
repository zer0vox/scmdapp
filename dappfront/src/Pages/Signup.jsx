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

  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

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

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(e.target.value !== confirmedPassword);
  };

  const handleConfirmedPasswordChange = (e) => {
    setConfirmedPassword(e.target.value);
    setPasswordMatchError(e.target.value !== password);
  };

  const signup = async (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setPasswordMatchError(true);
      return;
    }

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
      <div className="flex min-h-[100vh] flex-col justify-center px-6 py-12 lg:px-8 ">
        {/* Title */}
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="mx-auto  text-center text-3xl text-indigo-600 font-bold leading-9 tracking-tight hover:text-indigo-500"
          >
            Supply Chain Management
          </Link>
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Create New User
        </h2>

        {/* Form */}
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6">
            {/* Private Key */}
            <div>
              <label
                htmlFor="privatekey"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Private Key
              </label>
              <div className="mt-2">
                <input
                  value={
                    privatekey !== "" || hasEditedPrivateKey
                      ? privatekey
                      : privateKeyInitial
                  }
                  onChange={handlePrivateKeyChange}
                  id="privatekey"
                  required
                  className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User Name
              </label>
              <div className="mt-2">
                <input
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  id="name"
                  required
                  className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <input
                  id="address"
                  className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            {/* Aspect */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Select Your Category
              </label>
              <div className="mt-2">
                <select
                  value={aspect}
                  id="aspect"
                  onChange={(e) => setAspect(e.target.value)}
                  required
                  className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                >
                  <option> ... </option>
                  <option value="m">Manufacturer</option>
                  <option value="d">Distributor</option>
                  <option value="r">Retailer</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  type="password"
                  onChange={handlePasswordChange}
                  id="password"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmedPassword"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  value={confirmedPassword}
                  type="password"
                  onChange={handleConfirmedPasswordChange}
                  id="confirmedPassword"
                  required
                  className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              {passwordMatchError && (
                <p className="text-red-500 text-xs mt-1">
                  Passwords do not match
                </p>
              )}
            </div>

            <div>
              <button
                onClick={signup}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create New User
              </button>
            </div>
          </div>
          
          <div className="input-label text-orange-500">{signUpError}</div>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member?
            <Link
              to="/login"
              className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Already Have an Account?
            </Link>
          </p>
          <p className="mt-5 text-center text-sm text-gray-500">
            Or
            <Link
              to="/consumer"
              className="ml-2 font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Use Consumer Portal
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};
export default Signup;

import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

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

    try {
      const result = await axios.post("http://localhost:3001/login", {
        privatekey,
        name,
        aspect,
        password,
      });
      console.log(result);
      if (result.data === "done") {
        setAuthenticated("auth");
        setGlobalName(name);
        setGlobalKey(privatekey);
        setPageToChange(aspect);
        setChangeToStatus(true);
      } else {
        setLogInError("Incorrect Credentials, Please Try Again");
      }
    } catch (err) {
      console.log(err);
      setLogInError("Server Busy, Please Try Again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-[100vh] min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* Title */}
      <div className="flex flex-col items-center justify-center h-[100vh]">
  <Link
    to="/"
    className="text-center text-4xl text-teal-600 font-extrabold leading-9 tracking-tight hover:text-teal-500"
  >
    Supply Chain Surveillance Portal
  </Link>
  <h2 className="mt-6 text-center text-xl font-bold leading-7 tracking-tight text-gray-700">
    Sign in
  </h2>
</div>



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
                  privatekey !== "" || hasEditedPrivateKey || privatekey !== "Not connected" || privateKeyInitial !== "Not connected"
                    ? privatekey
                    : privateKeyInitial
                }
                onChange={handlePrivateKeyChange}
                id="privatekey"
                required
                className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
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
                className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Aspect */}
          <div>
            <label
              htmlFor="aspect"
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
                className="block w-full rounded-md border-0 bold p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              >
                <option> ... </option>
                <option value="m">Manufacturer</option>
                <option value="d">Distributor</option>
                <option value="r">Retailer</option>
              </select>
            </div>
          </div>

          {/* Password */}
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
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
                className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-teal-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              onClick={login}
              className="flex w-full justify-center rounded-md bg-teal-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-teal-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
            >
              Sign in
            </button>
          </div>
        </div>
        {/* Error Message */}
        <div className="input-label text-red-500">{logInError}</div>

        {/* Links */}
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link
            to="/signup"
            className="ml-2 font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >
            Create your Account
          </Link>
        </p>
        <p className="mt-5 text-center text-sm text-gray-500">
          Or
          <Link
            to="/consumer"
            className="ml-2 font-semibold leading-6 text-teal-600 hover:text-teal-500"
          >
            Use Consumer Portal
          </Link>
        </p>
      </div>
    </div>
  );
};
export default Login;

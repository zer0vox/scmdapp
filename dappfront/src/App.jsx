import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "chartjs-adapter-luxon";

import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Consumer from "./Pages/Consumer";
import Distributor from "./Pages/Distributor";
import DistributorAnalysis from "./Pages/DistributorAnalysis";
import Manufacturer from "./Pages/Manufacturer";
import ManufacturerAnalysis from "./Pages/ManufacturerAnalysis";


import Retailer from "./Pages/Retailer";
import RetailerAnalysis from "./Pages/RetailerAnalysis";
import PageNotFound from "./Pages/NotFound404";

import { useState, useEffect } from "react";
import abi from "./assets/contractfile/supplychain111.json";
import { ethers } from "ethers";

function App() {
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [auth, setAuthenticated] = useState('noauth');
  const [account, setAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [entity, setEntity] = useState("");
  const [globalName, setGlobalName] = useState("");
  const [globalKey, setGlobalKey] = useState("");
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount("");
      }
    };

    const template = async () => {
      const contractAddress = "0x9904BfF082d228689B2e49338F831C4F8A9E18E8";
      const contractABI = abi.abi;

      const { ethereum } = window;

      try {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentAccount = accounts[0];

        if (currentAccount) {
          setAccount(currentAccount);
          ethereum.on("accountsChanged", handleAccountsChanged);

          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          console.log(contract);
          setState({ provider, signer, contract });
          setContractInstance(contract);
        } else {
          setAccount("Not Connected");
        }
      } catch (error) {
        console.log("error = ", error);
        // show an error message to the user
      }
    };

    template();
  }, []);
  return (
    <Router>
      <NavBar auth={auth} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              contractInstance={contractInstance}
              account={account}
              auth={auth}
            />
          }
        />
        <Route
          path="/signup"
          element={<Signup account={account} contract={contractInstance} />}
        />
        <Route
          path="/login"
          element={
            <Login
              account={account}
              setGlobalKey={setGlobalKey}
              setEntity={setEntity}
              setGlobalName={setGlobalName}
              setAuthenticated={setAuthenticated}
              contract={contractInstance}
              auth={auth}
            />
          }
        />

        <Route
          path="/consumer"
          element={
            <Consumer
              globalName={globalName}
              globalKey={globalKey}
              entity={entity}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />
        <Route
          path="/distributor"
          element={
            <Distributor
              globalKey={globalKey}
              entity={entity}
              globalName={globalName}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />
        <Route
          path="/distributor/analysis"
          element={
            <DistributorAnalysis
              globalKey={globalKey}
              entity={entity}
              globalName={globalName}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />
        <Route
          path="/manufacturer"
          element={
            <Manufacturer
              entity={entity}
              globalName={globalName}
              globalKey={globalKey}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />

        <Route
          path="/manufacturer/analysis"
          element={
            <ManufacturerAnalysis
              globalKey={globalKey}
              entity={entity}
              globalName={globalName}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />
        <Route
          path="/retailer"
          element={
            <Retailer
              entity={entity}
              globalName={globalName}
              globalKey={globalKey}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />
        <Route
          path="/retailer/analysis"
          element={
            <RetailerAnalysis
              globalKey={globalKey}
              entity={entity}
              globalName={globalName}
              contractInstance={contractInstance}
              auth={auth}
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

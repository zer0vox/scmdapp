import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "chartjs-adapter-luxon";

// Components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

// Pages
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

// React hooks and libraries
import { useState, useEffect } from "react";
import abi from "./assets/contractfile/supplychainall.json";
import { ethers } from "ethers";

function App() {
  // States for provider, signer, contract, account, authentication, and global data
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [auth, setAuthenticated] = useState("noauth");
  const [account, setAccount] = useState("");
  const [contractInstance, setContractInstance] = useState(null);
  const [entity, setEntity] = useState("");
  const [globalName, setGlobalName] = useState("");
  const [globalKey, setGlobalKey] = useState("");

  // Effect hook to initialize Ethereum connection and contract instance
  useEffect(() => {
    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      } else {
        setAccount("");
      }
    };

    const template = async () => {
      const contractAddress = "0xEcDB040fDEE9a624Daae30d16DdAD0C9909fa03E";
      const contractABI = abi.abi;

      const { ethereum } = window;

      try {
        // Request account access
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
        const currentAccount = accounts[0];

        if (currentAccount) {
          setAccount(currentAccount);
          ethereum.on("accountsChanged", handleAccountsChanged);

          // Set up provider, signer, and contract instance
          const provider = new ethers.providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(contractAddress, contractABI, signer);

          console.log("Contract initialized:", contract);
          setState({ provider, signer, contract });
          setContractInstance(contract);
        } else {
          setAccount("Not Connected");
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
        // Optionally display an error message to the user
      }
    };

    template();
  }, []);

  return (
    <Router>
      {/* Navigation Bar */}
      <NavBar auth={auth} />

      {/* Application Routes */}
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
        {/* 404 Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;

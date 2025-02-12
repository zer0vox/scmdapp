import CreateRetailer from "../components/CreateRetailer";
import PurchaseItemByRetailer from "../components/PurchaseItemByRetailer";
import ReceivedItemByRetailer from "../components/ReceivedItemByRetailer";
import SellItemByRetailer from "../components/SellItemByRetailer";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
const Retailer = ({
  contractInstance,
  globalName,
  auth,
  globalKey,
  entity,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated, otherwise redirect to login
    if (auth !== "auth") {
      // You may want to customize the login route as needed
      console.log("home page");
      console.log(auth);
      navigate("/login");
    }
    if (entity !== "r") {
      navigate("/login");
    }
  }, [auth, navigate, entity]);
  return (
    <>
      <div className="bg-gradient-to-r from-teal-400 via-teal-300 to-teal-500 pt-8 pb-4">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          
          <PurchaseItemByRetailer
            contract={contractInstance}
            globalName={globalName}
            entity={entity}
            globalKey={globalKey}
          />
          <ReceivedItemByRetailer contract={contractInstance} />
          <SellItemByRetailer contract={contractInstance} />
        </div>
      </div>
    </>
  );
};

export default Retailer;

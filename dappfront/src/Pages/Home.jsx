import FetchItem from "../components/Fetchitem";
import FetchItemHistory from "../components/FetchItemHistory";
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import FetchProductStatus from "../components/FetchProductStatus";

const Home = ({ contractInstance, account, auth }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated, otherwise redirect to login
    if (auth !== "auth") {
      console.log("home page");
      console.log(auth);
      navigate("/login");
    }
  }, [auth, navigate]);

  useEffect(() => {
    // Log the updated auth state after login
    console.log("Updated auth state after login");
    console.log(auth);
  }, [auth]);

  return (
    <>
      <div className="bg-gradient-to-r flex flex-col min-w-full items-center justify-between from-teal-500 via-teal-400 to-teal-600">
        <div className="custom-form mx-auto pb-6 w-[50%] text-center">
          Connected:<br /> {account}
        </div>
        <div className="w-[50%]">
          <FetchItem contract={contractInstance} />
        </div>
        <div className="w-[50%]">
          <FetchItemHistory contract={contractInstance} />
        </div>
        <div className="w-[50%]">
          <FetchProductStatus contract={contractInstance} />
        </div>
      </div>
    </>
  );
};

export default Home;

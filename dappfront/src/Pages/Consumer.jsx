import BuyItemByConsumer from "../components/BuyItemByConsumer";
import CreateConsumer from "../components/CreateConsumer";
import CNavBar from "../components/CNavBar"; // Import the NavBar
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Consumer = ({ contractInstance, globalName, auth, entity }) => {
  const navigate = useNavigate();
  (auth = "auth"), (entity = "c");
  
  useEffect(() => {
    // You can add any side effects here if needed
  }, [auth, navigate, entity]);

  return (
    <>
      <CNavBar /> {/* Include the NavBar here */}
      <div className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 pt-8 pb-4">
        <br />
        <h2 className="mt-8 mb-8 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Consumer Page
        </h2>
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <CreateConsumer contract={contractInstance} />
          <BuyItemByConsumer contract={contractInstance} />
        </div>
      </div>
    </>
  );
};

export default Consumer;
import BuyItemByConsumer from "../components/BuyItemByConsumer";
import CreateConsumer from "../components/CreateConsumer";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Consumer = ({ contractInstance, globalName, auth, entity }) => {
  const navigate = useNavigate();
  (auth = "auth"), (entity = "c");
  useEffect(() => {
    // // Check if the user is authenticated, otherwise redirect to login
    // if (auth !== 'auth') {
    //   // You may want to customize the login route as needed
    //   console.log('home page')
    //   console.log(auth)
    //   navigate('/login')
    // }
    // if (entity !== 'c') {
    //   navigate('/login')
    // }
  }, [auth, navigate, entity]);
  return (
    <>
      <div className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 pt-8 pb-4">
        <br />
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Link
            to="/"
            className="mx-auto text-center text-3xl text-indigo-600 font-bold leading-9 tracking-tight hover:text-indigo-500"
          >
            Supply Chain Management
          </Link>
        </div>
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

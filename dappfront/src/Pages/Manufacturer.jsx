import ProduceItemByManufacturer from "../components/ProduceItemByManufacturer";
import SellItemByManufacturer from "../components/SellItemByManufacturer";
import ShippedItemByManufacturer from "../components/ShippedItemByManufacturer";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Manufacturer = ({
  contractInstance,
  globalKey,
  globalName,
  auth,
  entity,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated, otherwise redirect to login
    // auth == true, entity == "m";
    if (auth !== 'auth' && entity !== "m") {
      console.log(`authentication = ${auth} and entity = ${entity}`);
      navigate("/login");
    }
    console.log(globalName);
  }, [auth, navigate, entity]);
  return (
    <>
      <div className="bg-gradient-to-r from-violet-400 via-violet-300 to-violet-500 pt-8 pb-4">
        <div className="w-full lg:w-8/12 px-4 mx-auto mt-6">
          <ProduceItemByManufacturer
            contract={contractInstance}
            globalName={globalName}
            globalKey={globalKey}
            entity={entity}
          />
          <SellItemByManufacturer contract={contractInstance} />
          <ShippedItemByManufacturer
            contract={contractInstance}
            globalName={globalName}
            globalKey={globalKey}
            entity={entity}
          />
        </div>
      </div>
    </>
  );
};

export default Manufacturer;

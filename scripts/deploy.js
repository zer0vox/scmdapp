const hre=require("hardhat");

const main = async () => {
  const Supplychain = await hre.ethers.getContractFactory("supplychainall");
  const supplychain = await Supplychain.deploy();

  await supplychain.waitForDeployment();


  console.log("Transactions address: ", supplychain.target);
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();

// 0xAD4F7EE29f7BAcD36DdA0c22221C8F8547281C3a

// 0xEcDB040fDEE9a624Daae30d16DdAD0C9999fa03E
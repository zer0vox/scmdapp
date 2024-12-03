const hre=require("hardhat");

const main = async () => {
  const Supplychain = await hre.ethers.getContractFactory("supplychain111");
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

// 0x2AF85f07cE4a48d71E5ffeA18d1f72F0d80d5D78

// address used as second time deployment:  0xAaE630e3a986f1932BE7079E8e897cA15f7e989D
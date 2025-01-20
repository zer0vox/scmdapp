const { ethers } = require("ethers");

// Define the ABI of the contract
const abi = [
  "function exampleFunction(uint256 value) public returns (bool)",
];

try {
  // Create an interface instance
  const iface = new ethers.utils.Interface(abi);

  // Parse transaction data
  const decodedData = iface.parseTransaction({
    data: "0xb9a40d040000000000000000000000000000000000000000000000000000000000000022",
  });

  console.log(decodedData);
} catch (error) {
  console.error("Error:", error.message);
}

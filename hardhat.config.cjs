require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();


/** @type import('hardhat/config').HardhatUserConfig */
const SEPOLIA_URL = "https://sepolia.infura.io/v3/49420499ae06424b96be5edc51c26794"; // Replace with Sepolia testnet URL
const PRIVATE_KEY = "9885d7dfda81503622ff928c7eeb5ad598489f62ad29e16979156b4498fcceaf"; // Private key for  account

module.exports = {
  solidity: "0.8.17",
  networks: {
    sepolia: {
      url: SEPOLIA_URL,
      accounts: [PRIVATE_KEY],
    },
  },
};

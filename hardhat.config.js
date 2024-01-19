require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({path:'./.env'});
/** @type import('hardhat/config').HardhatUserConfig */
// const GOERLI_URL = process.env.GOERLI_URL;
const key = process.env.PRIVATE_KEY || "8d5dc68f333ed9ca6b8482e78d21a69a1f50d861b839dbbddee0d3b5e49c8897";
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: 'sepolia',
    networks: {
      hardhat: {},
      sepolia: {
        url: "https://eth-sepolia.g.alchemy.com/v2/mKWeUfHKniwSn0E8sepybb09NgaXUoKq",
        accounts: [`0x${key}`]
      }
    }
};

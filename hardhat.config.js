require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const { CONTRACT_API_URL, CONTRACT_PRIVATE_KEY } = process.env;

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337, // MetaMask mistakenly assume all network in localhost to have chain id of 1337 issue
    },
    rinkeby: {
      url: CONTRACT_API_URL,
      accounts: [`0x${CONTRACT_PRIVATE_KEY}`],
    },
  },
};

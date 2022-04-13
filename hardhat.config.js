require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",
  networks: {
    hardhat: {
      chainId: 1337, // MetaMask mistakenly assume all network in localhost to have chain id of 1337 issue
    },
    // rinkeby: {
    //   url: "",
    //   account
    // }
  },
};

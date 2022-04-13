const hre = require("hardhat");

async function main() {
  await hre.run("compile");

  const FaceNFT = await hre.ethers.getContractFactory("FaceNFT");
  const faceNft = await FaceNFT.deploy();

  await faceNft.deployed();

  console.log("FaceNFT deployed to:", faceNft.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

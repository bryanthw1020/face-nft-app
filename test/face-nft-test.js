const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("FaceNFT", () => {
  it("Should mint and transfer an NFT to someone", async () => {
    const FaceNFT = await ethers.getContractFactory("FaceNFT");
    const faceNft = await FaceNFT.deploy();

    await faceNft.deployed();

    const recipient = "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266";
    const metadataURI = "cid/test.png";

    let balance = await faceNft.balanceOf(recipient);

    expect(balance).to.equal(0);

    const newlyMintedToken = await faceNft.payToMint(recipient, metadataURI, {
      value: ethers.utils.parseEther("0.06"),
    });

    await newlyMintedToken.wait();

    balance = await faceNft.balanceOf(recipient);
    expect(balance).to.equal(1);

    expect(await faceNft.isContentOwned(metadataURI)).to.equal(true);
  });
});

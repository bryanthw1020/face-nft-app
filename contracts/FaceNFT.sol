// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FaceNFT is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 _mintCost = 1;
    mapping(string => uint8) existingURIs;

    modifier isMintable(string memory uri) {
        require(existingURIs[uri] != 1, "NFT already minted!");
        _;
    }

    modifier hasPaymentAmount() {
        require(msg.value == _mintCost * 1 ether, "Need to pay up!");
        _;
    }

    constructor() ERC721("FaceNFT", "FACE") {}

    function _baseURI() internal pure override returns (string memory) {
        return "ipfs://";
    }

    function safeMint(address to, string memory uri)
        public
        onlyOwner
        isMintable(uri)
    {
        _tokenIdCounter.increment();

        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId)
        internal
        override(ERC721, ERC721URIStorage)
    {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return existingURIs[uri] == 1;
    }

    function isContentOwner(uint256 tokenId) public view returns (bool) {
        return ownerOf(tokenId) == msg.sender;
    }

    function payToMint(address recipient, string memory uri)
        public
        payable
        isMintable(uri)
        hasPaymentAmount
        returns (uint256)
    {
        uint256 newItemId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        existingURIs[uri] = 1;

        _mint(recipient, newItemId);
        _setTokenURI(newItemId, uri);

        return newItemId;
    }

    function count() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function setMintCost(uint256 amount) public onlyOwner {
        _mintCost = amount;
    }

    function mintCost() public view returns (uint256) {
        return _mintCost;
    }
}

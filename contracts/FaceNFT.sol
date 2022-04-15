// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract FaceNFT is ERC721, ERC721URIStorage, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;
    uint256 private _mintCost = 1;
    uint256 private _maxSupply = 10;
    mapping(string => uint8) _existingURIs;
    mapping(uint256 => bool) _deletedTokens;

    modifier isMintable(string memory uri) {
        require(_existingURIs[uri] != 1, "NFT already minted!");
        require(totalSupply() < _maxSupply, "Total supply reached!");
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
        payable
        isMintable(uri)
        hasPaymentAmount
        returns (uint256)
    {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
        _existingURIs[uri] = 1;

        return tokenId;
    }

    function isContentOwned(string memory uri) public view returns (bool) {
        return _existingURIs[uri] == 1;
    }

    function isContentOwner(uint256 tokenId) public view returns (bool) {
        return ownerOf(tokenId) == msg.sender;
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIdCounter.current();
    }

    function setMintCost(uint256 amount) public onlyOwner {
        _mintCost = amount;
    }

    function mintCost() public view returns (uint256) {
        return _mintCost;
    }

    function setMaxSupply(uint256 amount) public onlyOwner {
        _maxSupply = amount;
    }

    function maxSupply() public view returns (uint256) {
        return _maxSupply;
    }

    function isTokenDeleted(uint256 tokenId) public view returns (bool) {
        return _deletedTokens[tokenId] == true;
    }

    // Custom overrides
    function burn(uint256 tokenId) public virtual override(ERC721Burnable) {
        super.burn(tokenId);
        _deletedTokens[tokenId] = true;
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
}

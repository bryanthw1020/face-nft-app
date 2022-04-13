# Simple Face NFT App
Ionnex simple Face NFT application build with NuxtJs and Solidity.

## Directory Structure
- client (NuxtJs)
- contracts, scripts, test (Solidity)

## Local Blockchain Setup
```sh
npx hardhat node
npx hardhat --network localhost scripts/deploy.js
```

## Client App Setup
1. Run `npm install`.
2. Next setup environment variable for client application by running command in your root project directory: `cp client/.env.example client/.env`
4. Run `npm run nuxt:dev` to start your local development environment

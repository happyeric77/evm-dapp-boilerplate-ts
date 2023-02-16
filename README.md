# The EVM DAPP typescript boilerplate

The boilerplate is powered by Nextjs/typechain which fully supports typescript.
Check the [result here](https://evm-dapp-boilerplate-ts.vercel.app/)

# How to use

1. clone the repo:

```
git clone https://github.com/happyeric77/evm-dapp-boilerplate-ts
```

2. install npm depandencies and generate types:

```
yarn install

yarn generate-types // Generate a new folder `contractTypes` which contains all the contracts types definition. The types are generated from /utils/contracts/*.json (compiled by truffle)
```

3. Run and listen on localhost port 3000

```
yarn dev
```

## useWeb3 hook

Use useWeb3 hook to easily access global web3 methods:

```
const { web3Data, loginWithInjectedWeb3, loginWithWalletConnect, logout, switchNetwork } = useWeb3();
```

# Release note

## 20230216

Consume the npm evm-web3-hook react hook
`yarn add evm-web3-hooks` or `npm install evm-web3-hooks`

## 20230214

1. Add approve-erc20 page to demo contract interaction
2. Introduce typechain (yarn generate-types) to enable types for web3.eth.Contract (see example in `./pages/approve-erc20.tsx`)
3. Add useLoading hook
4. Clean up and small optimization

## 20230212 Refactor and deprecate contract section

1. To reduce complexity, truffle section are removed. The contract section can be referred to [This repo](git@github.com:happyeric77/truffle_ts_boilerplate.git)

2. Remove unnecessary components
3. Add hooks: useWeb3 & useNotify
4. Move all style sheet to ./styles

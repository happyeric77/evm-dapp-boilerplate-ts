# The EVM DAPP typescript boilerplate

The boilerplate is powered by Nextjs which fully supports typescript

# How to use

1. clone the repo:

```
git clone https://github.com/happyeric77/reactDappBoilerplate
```

2. install npm depandencies:

```
yarn install
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

## 20230212 Refactor and deprecate contract section

1. To reduce complexity, truffle section are removed. The contract section can be referred to [This repo](git@github.com:happyeric77/truffle_ts_boilerplate.git)

2. Remove unnecessary components
3. Add hooks: useWeb3 & useNotify
4. Move all style sheet to ./styles

# Blockchain

[Follow these instructions](./setup.pdf) to run the UZH ETH blockchain and connect the Metamask Wallet.

# Defi App

```
git clone https://github.com/pbonazzi/21-blockchain-programming-seminar.git
cd 21-blockchain-programming-seminar
npm install
npm start
```

To compile and migrate the contracts to the blockchain

```
npx truffle compile
npx truffle migrate -reset
```

To issue tokens

```
npx truffle exec scripts/issue-token.js
```

# Common mistakes

### 1. Detached screens running on the background [terminating]

```
screen -ls
screen -X -S <name> quit
```

### 2. Permission denied.

Run the blockchain with this command instead.

```
screen geth --datadir ~/.uzheth --http --http.port 8545 --http.corsdomain "*" --http.vhosts "*" --http.api miner,eth,admin,net,web3,personal --networkid 702 --nodiscover --syncmode "full" --http.addr 0.0.0.0 --allow-insecure-unlock
```

Unlock the account

```
geth --datadir ~/.uzheth attach http://localhost:8545
personal.unlockAccount("0x00000", "password", 15000000)
```

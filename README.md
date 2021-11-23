# Installation

```
brew tap ethereum/ethereum
brew install ethereum
geth --datadir ~/.uzheth account new
geth account list --datadir ~/.uzheth
curl -O https://gitlab.uzh.ch/luca.ambrosini/go-ethereum/-/wikis/uploads/f36cd66fb248d69cdcaf6b5b27685d5b/uzheth.json
geth --datadir ~/.uzheth init uzheth.json
screen geth --datadir ~/.uzheth --http --http.port 8545 --http.corsdomain "*" --http.vhosts "*" --http.api miner,eth,admin,net,web3,personal --networkid 702 --nodiscover --syncmode "full" --http.addr 0.0.0.0 --allow-insecure-unlock
```

On another terminal run

```
geth --datadir ~/.uzheth --exec "admin.addPeer('enode://9e6935ba567720b330aaca94af80bf032ef8d0cb1b7cf8bd73c88320756639e08056f4f08c6a3837cde82a9b575ed26a7391d70fadfaec368e60841bb5654118@130.60.244.246:30303')"  attach http://localhost:8545
geth --datadir ~/.uzheth attach http://localhost:8545
```

To run the application

```
npm install
npm start
```

To compile and migrate the contracts to the blockchain

```
npx truffle compile
npx truffle migrate -reset
```

# Common error

[screen terminating]

```
screen -ls
screen -X -S <name> quit
```

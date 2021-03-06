import React, { Component } from "react";
import { theme } from "./styles/theme";
import { ThemeProvider } from "styled-components";
import Main from "./Main";
import Web3 from "web3";
import UZHStableToken from "../abis/UZHStableToken.json";
import UZHRewardToken from "../abis/UZHRewardToken.json";
import YieldFarm from "../abis/YieldFarm.json";

class App extends Component {
  async componentWillMount() {
    //It is invoked just before mounting occurs.
    //It is called before render().
    await this.loadWeb3();
    await this.loadBlockchainData();
  }

  async loadBlockchainData() {
    //open a window in web 3 that can communicate with the Ethereum network
    const web3 = window.web3;

    //get the accounts from the Ethereum network
    const accounts = await web3.eth.getAccounts();

    //insert them in the component's state
    this.setState({ account: accounts[0] });

    //insert them in the component's state
    const networkId = await web3.eth.net.getId();

    //load UZHETHToken
    //get a reference to the contract in the network
    const uzhethTokenData = UZHStableToken.networks[networkId];
    if (uzhethTokenData) {
      //create a new contract object with the same json interface of the respective smart contract
      //this allows us to interact with smart contracts as if they were JavaScript objects.
      const uzhethToken = new web3.eth.Contract(
        UZHStableToken.abi,
        uzhethTokenData.address
      );

      //pass the new object to the component state
      this.setState({ uzhethToken });

      //load the balance of the the account using the method "balanceOf" defined in the SC.
      let uzhethTokenBalance = await uzhethToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({ uzhethTokenBalance: uzhethTokenBalance.toString() });
    } else {
      window.alert("UZHStableToken contract not deployed to detected network.");
    }

    // Same procedure for Amongus Token
    const uzhrewardTokenData = UZHRewardToken.networks[networkId];
    if (uzhrewardTokenData) {
      const uzhrewardToken = new web3.eth.Contract(
        UZHRewardToken.abi,
        uzhrewardTokenData.address
      );
      this.setState({ uzhrewardToken });
      let uzhrewardTokenBalance = await uzhrewardToken.methods
        .balanceOf(this.state.account)
        .call();
      this.setState({
        uzhrewardTokenBalance: uzhrewardTokenBalance.toString(),
      });
    } else {
      window.alert("UZHRewardToken contract not deployed to detected network.");
    }

    // TokenFarm
    const tokenFarmData = YieldFarm.networks[networkId];
    if (tokenFarmData) {
      const tokenFarm = new web3.eth.Contract(
        YieldFarm.abi,
        tokenFarmData.address
      );
      this.setState({ tokenFarm });
      let deposingBalance = await tokenFarm.methods
        .deposingBalance(this.state.account)
        .call();
      this.setState({ deposingBalance: deposingBalance.toString() });
    } else {
      window.alert("YieldFarm contract not deployed to detected network.");
    }

    this.setState({ loading: false });
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  }

  deposeTokens = (amount) => {
    //buffer before the action is executed
    this.setState({ loading: true });

    //wait for approval on the balance account and send the token amount to the given address.
    this.state.uzhethToken.methods
      .approve(this.state.tokenFarm._address, amount)
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.state.tokenFarm.methods
          .deposeTokens(amount)
          .send({ from: this.state.account })
          .on("transactionHash", (hash) => {
            this.setState({ loading: false });
          });
      });
  };

  undeposeTokens = (amount) => {
    //buffer before the action is executed
    this.setState({ loading: true });

    //directly transfer the token amount to the given address.
    this.state.tokenFarm.methods
      .undeposeTokens()
      .send({ from: this.state.account })
      .on("transactionHash", (hash) => {
        this.setState({ loading: false });
      });
  };

  constructor(props) {
    //inherit all the attributes of Components
    super(props);

    //define state variables valid only inside the component
    this.state = {
      account: "0x0",

      uzhethToken: {},
      uzhrewardToken: {},
      tokenFarm: {},

      uzhethTokenBalance: "0",
      uzhrewardTokenBalance: "0",
      deposingBalance: "0",

      loading: true,
    };
  }

  render() {
    // invoked when a the App component is called. (logic of the return statement)
    let content;
    if (this.state.loading) {
      content = (
        <p id="loader" className="text-center">
          Loading...
        </p>
      );
    } else {
      content = (
        <Main
          uzhethTokenBalance={this.state.uzhethTokenBalance}
          uzhrewardTokenBalance={this.state.uzhrewardTokenBalance}
          deposingBalance={this.state.deposingBalance}
          deposeTokens={this.deposeTokens}
          getTokens={this.undeposeTokens}
        />
      );
    }

    // what's really displayed in the UI

    return <ThemeProvider theme={theme}>{content}</ThemeProvider>;
  }
}

export default App;

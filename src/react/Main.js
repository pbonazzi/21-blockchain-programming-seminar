import React, { Component } from "react";
import { theme } from "./styles/theme";
import BalanceAccount from "./components/BalanceAccount";
import "./Main.css";
import { ThemeProvider } from "styled-components";

class Main extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <div
          className="containerA"
          style={{ background: theme.background, color: theme.text }}
        >
          <div
            className="containerLEFT"
            style={{ background: theme.side_container, color: theme.text }}
          >
            <BalanceAccount
              text={"Main Balance"}
              balance={window.web3.utils.fromWei(
                this.props.uzhethTokenBalance,
                "ether"
              )}
              currency={"|UZHETH|"}
            />
            <BalanceAccount
              text={"Investment Balance"}
              balance={window.web3.utils.fromWei(
                this.props.deposingBalance,
                "ether"
              )}
              currency={"|UZHETH|"}
            />
            <BalanceAccount
              text={"Reward Balance"}
              balance={window.web3.utils.fromWei(
                this.props.uzhrewardTokenBalance,
                "ether"
              )}
              currency={"|UZH+|"}
            />
          </div>

          <div
            className="containerRIGHT"
            style={{ background: theme.side_container }}
          >
            <div
              className="box"
              style={{ background: theme.box, color: theme.text }}
            >
              <div className="form">
                <form
                  className="form"
                  onSubmit={(event) => {
                    event.preventDefault();
                    let amount;
                    amount = this.input.value.toString();
                    amount = window.web3.utils.toWei(amount, "Ether");
                    this.props.deposeTokens(amount);
                  }}
                >
                  <input
                    class="input"
                    style={{
                      borderColor: theme.text,
                      color: theme.text,
                    }}
                    type="text"
                    ref={(input) => {
                      this.input = input;
                    }}
                    placeholder="0"
                    required
                  />
                  <button
                    class="button"
                    style={{
                      background: theme.text,
                      color: theme.side_container,
                    }}
                    type="submit"
                  >
                    INVEST
                  </button>
                </form>
              </div>
              <button
                class="button"
                style={{ background: theme.side_container, color: theme.text }}
                type="submit"
                onClick={(event) => {
                  event.preventDefault();
                  this.props.getTokens();
                }}
              >
                DISINVEST
              </button>
              <div style={{ fontSize: 12, textAlign: "bottom" }}>
                Provided by Can Inan and Pietro Bonazzi
              </div>
            </div>
          </div>
        </div>
      </ThemeProvider>
    );
  }
}

export default Main;

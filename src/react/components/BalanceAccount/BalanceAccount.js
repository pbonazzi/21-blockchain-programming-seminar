import React from "react";
import { BalanceAccountStyled } from "./BalanceAccount.styled";

const BalanceAccount = (props) => {
  return (
    <BalanceAccountStyled>
      <div className={"balance"}>
        <text className={"text"}>{props.text}</text>
        <div className={"number"}>{props.balance}</div>
        <div className={"currency"}>{props.currency}</div>
      </div>
    </BalanceAccountStyled>
  );
};
export default BalanceAccount;

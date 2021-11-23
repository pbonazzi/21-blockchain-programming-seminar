import styled from "styled-components";

export const BalanceAccountStyled = styled.button`
  background: ${({ theme }) => theme.side_container};
  border-width: 0;
  height: 150px;
  width: 400px;
  padding: 40px;
  pointer-events: none;

  .balance {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 30px;
    text-align: left;
    align-self: center;
  }

  .number {
    margin-left: 40px;
    font-size: 45px;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.text};
  }

  .currency {
    margin-left: 30px;
    font-size: 25px;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.text};
  }

  .text {
    font-size: 20px;
    font-family: ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.text};
  }
`;

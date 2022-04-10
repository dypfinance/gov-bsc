import React, { Component } from "react";
import Success from "../assets/success.png";
import { shortenAddress } from "../functions/getShortAddress";
import Copy from "../assets/copy.png";

import handIcon from "../assets/hand.svg";
import walletLogo from "../assets/whiteWallet.svg";
import { toBeInTheDocument } from "@testing-library/jest-dom";

const { new_governance: governance, reward_token, BigNumber } = window;
class Connected extends Component {
  state = {
    copied: false,
    is_wallet_connected: false,
    token_balance: "",
  };

  checkConnection = async () => {
    let test = await window.web3.eth?.getAccounts().then((data) => {
      data.length === 0
        ? this.setState({ is_wallet_connected: false })
        : this.setState({ is_wallet_connected: true });
    });
  };

  refreshBalance = async () => {
    if (this.state.is_wallet_connected === true) {

    
      try {
          let coinbase = await window.getCoinbase();
       let _rBal = reward_token.balanceOf(coinbase).then(data=> this.setState({token_balance: window.web3.utils.fromWei(data, 'ether')}))
      

        this.setState({
         
        });
      } catch (e) {
        console.error(e);
      }
    }
  };

  componentDidMount() {
    this.refreshBalance();
    this.checkConnection();
    window._refreshBalInterval = setInterval(this.checkConnection, 1000);
    window.gRefBalInterval = setInterval(this.refreshBalance, 2000);
  }

  componentWillUnmount() {
    clearInterval(window.gRefBalInterval);
  }

  render() {
    // const account = window.ethereum.selectedAddress;
    let noVotes = localStorage.getItem('NoVotes');
 
    return (
      <div className="d-flex justify-content-between w-100">
        <div className="colored-container">
          <span>My DYP Balance</span>
          &nbsp; &nbsp; &nbsp;
          <img src={walletLogo} color="white" alt="wallet-icon" />
          &nbsp; {this.state.token_balance} DYP
        </div>
        <div className="colored-container">
          <span>My NO Votes</span>
          &nbsp; &nbsp; &nbsp;
          <img src={handIcon} alt="hand-icon" />
          &nbsp;  {noVotes == null ? 0 : noVotes} DYP
        </div>
      </div>
      // <div className="connectWallet">
      //   <h3 className="titleWrapper">
      //     <div className="successWrapper">
      //       <img
      //         src={Success}
      //         alt="success"
      //         style={{ height: 20, width: 20 }}
      //       />
      //     </div>
      //     Wallet has been connected
      //   </h3>
      //   <h5 className="mb-0 d-flex justify-content-center gap-3">
      //     {shortenAddress(account)}
      //     {this.state.copied === true ? (
      //       <img src={Success} alt="success" />
      //     ) : (
      //       <img
      //         src={Copy}
      //         alt="copy"
      //         style={{
      //           height: 20,
      //           width: 20,
      //           filter: "contrast(0.5)",
      //           cursor: "pointer",
      //         }}
      //         onClick={() => {
      //           navigator.clipboard.writeText(account);
      //           this.setState({ copied: true });
      //         }}
      //       />
      //     )}
      //   </h5>
      // </div>
    );
  }
}

export default Connected;

import React, { Component } from "react";
import Success from "../assets/success.png";
import { shortenAddress } from "../functions/getShortAddress";
import Copy from "../assets/copy.png";

import handIcon from '../assets/hand.svg';
import walletLogo from '../assets/whiteWallet.svg';

const { new_governance: governance, reward_token, BigNumber } = window;
class Connected extends Component {
  state = {
    copied: false,
  };

  render() {
    //   const [isCopied, setCopied] = useCopyClipboard()
    const account = window.ethereum.selectedAddress;
    return (
      <div className="d-flex justify-content-between w-100">
        <div className="colored-container">
          <span>My DYP Balance</span>
          &nbsp;
          &nbsp;
          &nbsp;
          <img src={walletLogo} color="white" alt="wallet-icon" />
          &nbsp;
          0.000000 DYP
        </div>
        <div className="colored-container">
          <span>My NO Votes</span>
          &nbsp;
          &nbsp;
          &nbsp;
          <img src={handIcon} alt="hand-icon" />
          &nbsp;
          0.000000 DYP
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

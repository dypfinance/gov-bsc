import React from "react";
// import { Route } from 'react-router-dom'
import Footer from "./components/footer";
//import Governance from './components/governance'
// import Governance from './components/governance-new'
import Governance from "./components/governance-v2";
import Header from "./components/header";
import BscHero from "./assets/bscHero.svg";
import NotConnected from "./components/NotConnected";
import Connected from "./components/Connected";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_wallet_connected: false,
      darkTheme: false,
    };
  }

  toggleTheme = () => {
    let darkTheme = !this.state.darkTheme;
    document.body.classList[darkTheme ? "add" : "remove"]("dark");
    this.setState({ darkTheme });
  };

  handleConnection = async () => {
    try {
      let is_wallet_connected = await window.connectWallet();
      this.setState({
        is_wallet_connected,
        coinbase: await window.web3.eth.getCoinbase(),
      });
    } catch (e) {
      window.alertify.error(String(e));
    }
  };

  render() {
    return (
      <div className="App text-center">
        <Header
          darkTheme={this.state.darkTheme}
          toggleTheme={this.toggleTheme}
        />
        <div className="container App-container p-0">
          <div className="">
            <div className="container-fluid p-0">
              <div className="exchangeWrapper">
                <div className="innerBanner">
                  <h1 className="bannerTitle">BSC Governance</h1>
                  <p className="bannerSubTitle">Give your proposals</p>
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  <img src={BscHero} alt="ethHero" id="ethHero" />
                </div>
              </div>
            </div>
            <div className="container p-0">
              <div
                className={`${
                  !this.state.is_wallet_connected
                    ? "containertop"
                    : "connectWallet-blue d-block d-md-flex"
                } 
                  col-lg-7`}
              >
                {this.state.is_wallet_connected === false ? (
                  <>
                    <span style={{ display: "flex" }}>My Wallet</span>
                    <NotConnected handleConnection={this.handleConnection} />
                  </>
                ) : (
                  <Connected />
                )}
              </div>
              <Governance connected={this.state.is_wallet_connected} />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;

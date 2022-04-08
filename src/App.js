import React from 'react';

import { Route } from 'react-router-dom'
import Footer from './components/footer';

//import Governance from './components/governance'
// import Governance from './components/governance-new'
import Governance from './components/governance-v2'
import Header from './components/header';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      is_wallet_connected: false,
      darkTheme: false
    }
  }

  toggleTheme = () => {
    let darkTheme = !this.state.darkTheme
    document.body.classList[darkTheme?'add':'remove']('dark')
    this.setState({ darkTheme })
  }


  handleConnection = async () => {
    try {
      let is_wallet_connected = await window.connectWallet()
      this.setState({is_wallet_connected, coinbase: await window.web3.eth.getCoinbase()})
    } catch (e) {
      window.alertify.error(String(e))
    }
  }

render() {

  if (!this.state.is_wallet_connected) {
    return (<div className='App text-center'>
      <Header darkTheme={this.state.darkTheme} toggleTheme={this.toggleTheme} />
      <div className='container' className='App-container'>
        <div className='mt-5'>
          <h3 className='mb-4'>Please connect wallet to use this dApp</h3>
          <button onClick={this.handleConnection} style={{borderRadius: '6px'}} className='btn btn-primary pr-5 pl-5'>
            CONNECT WALLET</button>
        </div>
      </div>
      <Footer />
    </div>);
  }
  return (
    <div className="App">
      <Header darkTheme={this.state.darkTheme} toggleTheme={this.toggleTheme} />
      <div className="container mt-5 App-container" style={{minHeight: '500px'}}>
        <Route path='/' render={props => <Governance {...props} />} />
      </div>
      <Footer />
    </div>
  );
}
}

export default App;

import React from 'react';
import Web3 from 'web3';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: {},
      accounts: [],
      balance: 0,
      isLoading: true
    }
  }

  async initWeb3() {
    let web3 = this.state.web3;
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      await web3.eth.requestAccounts().then(acct => this.setState({accounts: [...acct]}));
      await web3.eth.getBalance(this.state.accounts[0]).then(wei => web3.utils.fromWei(wei)).then(bal => this.setState({balance: bal}));
      alert('Modern Dapp Browser/Wallet Detected');
    } else if (window.web3) {
      web3 = new Web3(window.web3);
      await web3.eth.getAccounts().then(acct => this.setState({accounts: [...acct]}));
      await web3.eth.getBalance(this.state.accounts[0]).then(wei => web3.utils.fromWei(wei)).then(bal => this.setState({balance: bal}));
      alert('Legacy Web3 Dapp Browser Detected');
    } else if (!window.ethereum && !window.web3) {
      alert('Ethereum Dapp Browser/Wallet Not Detected. Please Install Metamask or other Web3 Dapp Browser.')
    }
    this.setState({isLoading: false, web3: web3});
  }

  componentDidMount() {
    this.initWeb3();
  }

  render() {
    return (
      <div>
        {
          !this.state.isLoading ? (!window.ethereum ? <span>Please install web3 wallet or dapp browser.</span> :
          <span>Address: {this.state.accounts} <br />Balance: {this.state.balance}</span>) :
          <span>Dapp is loading...</span>
        }
      </div>
    )
  }

}
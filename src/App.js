import logo from './logo.svg';
import './App.css';
import abi from './NFT.json';
import React, { useState } from 'react';
const { ethers } = require('ethers');

function App() {

  const [InputValue, setInputValue] = useState('');
  const [currentAccount, setCurrentAccount] = useState('');

  const { ethereum } = window;
  const contractAddress = '0xe66Ed26030aC90792A8920AE48b8215409Ef321a'
  const getContract = () => {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const transactionContract = new ethers.Contract(contractAddress, abi.abi, signer);
    return transactionContract;

    // console.log({ provider, signer, transactionContract });
  }
  //////////////////////////////////////////////////////////////////////////////////////////////

  const transaction_contract = getContract();

  // await transaction_contract.name();

  // await transaction.symbol();
  const handleChange = (e) => {
    e.preventDefault();
    setInputValue(e.target.value);
  }

  const connectWallet = async () => {
    try {
      if (!ethereum) return alert("please install metamask");
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      // console.log(accounts);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  const payToMint = async () => {
    
    const options = {value: ethers.utils.parseEther("0.05")}
    const NFT_Token =  await transaction_contract.payToMint(currentAccount,options);
    console.log(NFT_Token);
  }

  const IsContentOwned = async () => {
    const owned_status =  await transaction_contract.isContentOwned(InputValue);
    console.log(owned_status);
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Interact with smart contract
        </p>
        <button onClick={connectWallet}>connectWallet</button>
        <p>NFT URI: <input type="text" name="lastname" onChange={handleChange} /></p>
        <button onClick={payToMint}>Pay to Mint</button>
        <button onClick={IsContentOwned}>Is Content Owned</button>

      </header>
    </div>
  );
}

export default App;



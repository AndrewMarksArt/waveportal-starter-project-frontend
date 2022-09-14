import React, {useEffect, useState}  from "react";
import { ethers } from "ethers";
import './App.css';
import abi from "./utils/WavePortal.json";


const App = () => {

  const [currentAccount, setCurrentAccount] = useState("");
  const contractAddress = "";
  const contractABI = abi.abi;
  
  const checkIfWalletIsConnected = async () => {
      try{
        const { ethereum } = window;
    
        if (!ethereum) {
          console.log('make sure you have metamask.');
        } else {
          console.log('we have the ethereum object: ', ethereum);
        }

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("found autherized account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("no authorized account found");
        }
        
      } catch (error) {
        console.log(error);
      }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        alert("get metamask");
        return;
      }

      const accounts = await ethereum.request({method: "eth_requestAccounts"});

      console.log("connected: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      
    } catch (error) {
      console.log(error);
    }
  }

  const wave = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const wavePortalContract = new ethers.Contract(contract.address, contractABI, signer);

        let count = await wavePortalContract.getTotalWaves();
        console.lor("retrieved total wave count: ", count.toNumber());

        const waveTxn = await wavePortalContract.wave();
        console.log("Mining...: ", waveTxn.hash);

        await waveTxn.wait();
        console.log("Mined -- ", waveTxn.hash);

        count = await wavePortalContract.getTotalWaves();
        console.lor("retrieved total wave count: ", count.toNumber());
      } else {
        console.log("ethereum object doesnt exist");
      }
    } catch(error) {
      console.log(error);
    }
  }

  useEffect (() => {
    checkIfWalletIsConnected();
  }, [])
    
  return (
    <div className="mainContainer">
      <div className="dataContainer">
        <div className="header">
        👋 Hey there!
        </div>
  
        <div className="bio">
        I am Andrew and I'm learning about smart contract development! Connect your wallet to continue.
        </div>
  
        <button className="waveButton" onClick={wave}>
          Wave at Me
        </button>

        {!currentAccount && (
          <button className="connectButton" onClick={connectWallet}>
            Connect Wallet
          </button>
      )}
      </div>
    </div>
  );
}

export default App

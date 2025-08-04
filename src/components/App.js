import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';

// using smart contracts
import Tether from "../truffle_abis/Tether.json";
import RWD from "../truffle_abis/RWD.json";
import DecentralBank from "../truffle_abis/DecentralBank.json";

export default function App(){


    const [accountData, setAccountData] = useState({
        account: "0x0",
        tether: {},
        rwd: {},
        decentralBank: {},
        tetherBalance: 0,
        rwdBalance: "0",
        stakingBalance: "0",
        loading: true
    });

    const loadWeb3 = async () => {
        if (window.ethereum) {  // Corrected typo: ethereuem -> ethereum
            window.web3 = new Web3(window.ethereum);
            try {
                // Request account access
                await window.ethereum.request({ method: 'eth_requestAccounts' });
            } catch (error) {
                console.error("User denied account access");
            }
        } else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider);
        } else {
            window.alert('No Ethereum browser extension detected!');
        }
    }

    const loadBlockchainData = async () => {
        try{
            if (typeof window.web3 !== 'undefined') {
                const web3 = window.web3;
                const accounts = await web3.eth.getAccounts();
                setAccountData(prevState => ({...prevState, account: accounts[0]}));
                //console.log("Accounts:", accounts);
                const networkId = await web3.eth.net.getId()

                // load tether contract
                const tetherData = await Tether.networks[networkId]
                if(tetherData){
                    const tether = new web3.eth.Contract(Tether.abi, tetherData.address)
                    setAccountData(prevState => ({...prevState, tether: tether}))
                    let tetherBalance = await tether.methods.balanceOf( accounts[0]).call()
                    setAccountData(prevState => ({...prevState, tetherBalance: tetherBalance.toString() }))
                    //console.log({balance: tetherBalance})
                }
                else{
                    window.alert("Error! tether contract not deployed - no detect network")
                }

                // load RWS contract
                const rwdData = await RWD.networks[networkId]
                if(rwdData){
                    const rwd = new web3.eth.Contract(RWD.abi, rwdData.address)
                    setAccountData(prevState => ({...prevState, rwd: rwd}))
                    let rwdBalance = await rwd.methods.balanceOf( accounts[0]).call()
                    setAccountData(prevState => ({...prevState, rwdBalance: rwdBalance.toString() }))
                    //console.log({balance: rwdBalance})
                }
                else{
                    window.alert("Error! rwd contract not deployed - no detect network")
                }

                // load decentralBank contract
                const decentralBankData = await DecentralBank.networks[networkId]
                if(decentralBankData){
                    const decentralBank = new web3.eth.Contract(DecentralBank.abi, decentralBankData.address)
                    setAccountData(prevState => ({...prevState, decentralBank: decentralBank}))
                    let stakingBalance = await decentralBank.methods.stackingBalance( accounts[0]).call()
                    setAccountData(prevState => ({...prevState, stakingBalance: stakingBalance.toString() }))
                    //console.log({balance: stakingBalance})
                }
                else{
                    window.alert("Error! DecentralBank contract not deployed - no detect network")
                }

                setAccountData(prevState => ({...prevState, loading: false}))



                if (accounts.length === 0) {
                    console.log("No accounts found. Please connect to MetaMask.");
                } else {
                    console.log("Connected account:", accounts[0]);
                }
            } else {
                console.log("Web3 not initialized");
            }
        }
        catch(error){
            console.error("Error loading blockchain data:", error);
        }
    }

    useEffect(() => {
        const init = async () => {
            await loadWeb3();
            await loadBlockchainData();
        }
        init();
    }, []);




    return(
        <div>
            <Navbar account_data={accountData}/>
            
        </div>
    )
}
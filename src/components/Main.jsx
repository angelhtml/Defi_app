"use client"
import { useEffect, useState } from "react";
import MainStyle from "./Main.module.css";

export default function Main({accountData, stakeTokens, unstakeTokens}){
    const [amount, setAmount] = useState(0)

    useEffect(() => {
        console.log(accountData)
    },[])

    const Deposit = () => {
        stakeTokens(window.web3.utils.toWei(amount.toString(), "Ether"))
    }

    return(
        <div>

            <div className={MainStyle.container}>
                <div className={MainStyle.box1}>
                    <h2>Staking Balance</h2>
                    <div className={MainStyle.line}></div>
                    <h3>{window.web3.utils.fromWei(accountData.stakingBalance, 'Ether')} USDT</h3>
                </div>

                <div className={MainStyle.box2}>
                    <h2>Reward Balance</h2>
                    <div className={MainStyle.line}></div>
                    <h3>{window.web3.utils.fromWei(accountData.rwdBalance, 'Ether')} RWD</h3>
                </div>
            </div>

            <div className={MainStyle.main}>
                <div className={MainStyle.dashboard}>
                    <p>Stake Tokens</p>
                    <p>Balance: {window.web3.utils.fromWei(accountData.tetherBalance, 'Ether')}</p>
                </div>
                <div className={MainStyle.input_section}>
                    <input onChange={(i) => setAmount(i.target.value)} type="number" placeholder="amount" min={0}/>
                    <label>USDT</label>
                </div>
                <div className={MainStyle.button_sction}>
                    <button onClick={Deposit}>Deposit</button>
                    <button onClick={unstakeTokens}>Withdraw</button>
                    <button>Airdrop</button>
                </div>
            </div>

            <div className={MainStyle.shadows}></div>
            <div className={MainStyle.shadows2}></div>

        </div>
    )
}
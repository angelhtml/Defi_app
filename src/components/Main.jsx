import MainStyle from "./Main.module.css";

export default function Main(){
    return(
        <div>

            <div className={MainStyle.container}>
                <div className={MainStyle.box1}>
                    <h2>Staking Balance</h2>
                    <div className={MainStyle.line}></div>
                    <h3>USDT</h3>
                </div>

                <div className={MainStyle.box2}>
                    <h2>Reward Balance</h2>
                    <div className={MainStyle.line}></div>
                    <h3>RWD</h3>
                </div>
            </div>

            <div className={MainStyle.main}>
                <div className={MainStyle.dashboard}>
                    <p>Stake Tokens</p>
                    <p>Balance: </p>
                </div>
            </div>

        </div>
    )
}
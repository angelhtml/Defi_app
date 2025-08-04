import NavStyle from "./Navbar.module.css";

export default function Navbar({account_data}){
    //console.log(account_data.tetherBalance)
    return(
        <nav className={NavStyle.nav}>
            <a href="#" className={NavStyle.logo}>DAPP Yaild Staking</a>
            <ul className={NavStyle.ul}>
                <li>
                    Account Number: {account_data.account}
                </li>
            </ul>
        </nav>
    )
}
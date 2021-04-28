import { Connection } from "@solana/web3.js";
import {swap} from "./swap";
import fetch from "node-fetch";
import { loadPools } from "./loadPools";

// export const STAKE_INFO_LAYOUT_V4 = struct([
//     u64('state'),
//     u64('nonce'),
//     publicKey('poolLpTokenAccount'),
//     publicKey('poolRewardTokenAccount'),
//     u64('totalReward'),
//     u128('perShare'),
//     u64('perBlock'),
//     u8('option'),
//     publicKey('poolRewardTokenAccountB'),
//     blob(7),
//     u64('totalRewardB'),
//     u128('perShareB'),
//     u64('perBlockB'),
//     u64('lastBlock'),
//     publicKey('owner')
//   ])

// export const USER_STAKE_INFO_ACCOUNT_LAYOUT_V4 = struct([
//     u64('state'),
//     publicKey('poolId'),
//     publicKey('stakerOwner'),
//     u64('depositBalance'),
//     u64('rewardDebt'),
//     u64('rewardDebtB')
//   ])

//pubKey = 8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV
async function tryTrade () {
    let conn = new Connection('https://solana-api.projectserum.com/');

    let accountId = 'CBuCnLe26faBpcBP2fktp4rp8abpcAnTWft6ZrP5Q4T'

    //load pool info here

    let pools = await loadPools(conn);

    console.log(pools);


    //swap

    await swap(conn, 
        '8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV',//Owner 
        null,//private key
        pools['3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC'],
         // from USDC into STEP
        //from, to ,mints
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
        'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', 
        //ours
        '5UuT6nEQPGu8U4jbHqbkxfTdgF4rfSecJF8Cg1aokfhy',
        'FtsduKNZPJicNhMYxPwpzkw1sFWiX85c36tJQ9JU5Nox',
        '0.1',5);






    // let x = await fetch("https://solana-api.projectserum.com/", {
    //     method: "POST", headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({ jsonrpc:"2.0", id:1, method:"getAccountInfo", params:[accountId, {"encoding": "jsonParsed"}]}),
    //     }).then(async (res) => {
    //         let ans = await res.json();
    //         // console.log(ans);
    //         let myLayout = ans.result.value.data
    //         console.log(myLayout);
    //         console.log('before');
    //         //let decoded = AMM_INFO_LAYOUT_V4.decode(myLayout);
    //         let decoded = STAKE_INFO_LAYOUT_V4.decode(myLayout);
    //         console.log(decoded);
    //     }).catch(error => console.log(error));


    // curl https://solana-api.projectserum.com/ -X POST -H "Content-Type: application/json" -d '
    // {
    //   "jsonrpc": "2.0",
    //   "id": 1,
    //   "method": "getAccountInfo",
    //   "params": [
    //     "3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC",
    //     {
    //       "encoding": "jsonParsed"
    //     }
    //   ]
    // }


    // await swap(conn, 
    //     '8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV',//Owner 
    //     //private key
    //     StepLPInfo,
    //      // from USDC into STEP
    //     //from, to ,mints
    //     'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    //     'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', 
    //     //ours
    //     '5UuT6nEQPGu8U4jbHqbkxfTdgF4rfSecJF8Cg1aokfhy',
    //     'FtsduKNZPJicNhMYxPwpzkw1sFWiX85c36tJQ9JU5Nox',
    //     '0.1',5);

}

tryTrade();
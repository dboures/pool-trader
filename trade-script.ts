import { Connection } from "@solana/web3.js";
import {swap} from "./swap";
import { loadPools } from "./loadPools";
import { privateKey }from "./pKey"
import { swapInfo } from "./inputs";

async function tryTrade (str: string) {
    let conn = new Connection(str);
    console.log('started');

    let pool = await loadPools(conn);

    console.log(pool)

    await swap(conn, 
        '8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV',// Owner Solana Address 
        privateKey,
        pool, // poolInfo
        swapInfo.fromMint, // from mint
        swapInfo.toMint, // to mint
        swapInfo.userUSDC, // our USDC
        swapInfo.userCoinAccount, // our Token
        '1',//USDC tokens
        5) //% slippage;




    }

    //tryTrade('https://solana--mainnet--rpc.datahub.figment.io/apikey/f9b33575da71d7706da5ab30fd8e9ce3/health');
tryTrade('https://solana-api.projectserum.com/');
// tryTrade('https://api.mainnet-beta.solana.com');
// tryTrade('https://raydium.rpcpool.com');

// setInterval(() => {
//     tryTrade('https://api.mainnet-beta.solana.com');
//     tryTrade('https://solana-api.projectserum.com/');
//     tryTrade('https://raydium.rpcpool.com');
// }, 2000);


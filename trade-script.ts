import { Connection } from "@solana/web3.js";
import {swap} from "./swap";
import { loadPools } from "./loadPools";
import { privateKey }from "./pKey"

async function tryTrade (str: string) {
    let conn = new Connection(str);
    console.log('started');

    let pool = await loadPools(conn);

    console.log(pool)

    //swap media
    // await swap(conn, 
    //     '8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV',// Owner Solana Address 
    //     '',//private key
    //     pools['A5zanvgtioZGiJMdEyaKN4XQmJsp1p7uVxaq2696REvQ'], // poolInfo
    //     'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // from mint
    //     'ETAtLmCmsoiEEKfNrHKJ2kYy3MoABhU6NQvpSfij5tDs', // to mint
    //     '5UuT6nEQPGu8U4jbHqbkxfTdgF4rfSecJF8Cg1aokfhy', // our USDC
    //     'DA2zNJqegyVcUFcbTo7Waq19m1WZwh8UGPs98pdn6xnG', // our Token
    //     '30000',//USDC tokens
    //     95) //% slippage;

        //swap step
    await swap(conn, 
        '8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV',// Owner Solana Address 
        privateKey,
        pool, // poolInfo -? Find out how to just return this
        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', // from mint
        'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', // to mint
        '5UuT6nEQPGu8U4jbHqbkxfTdgF4rfSecJF8Cg1aokfhy', // our USDC
        'FtsduKNZPJicNhMYxPwpzkw1sFWiX85c36tJQ9JU5Nox', // our Token
        '1',//USDC tokens
        5) //% slippage;




    }

tryTrade('https://solana-api.projectserum.com/');
// tryTrade('https://api.mainnet-beta.solana.com');
// tryTrade('https://raydium.rpcpool.com');

// setInterval(() => {
//     tryTrade('https://api.mainnet-beta.solana.com');
//     tryTrade('https://solana-api.projectserum.com/');
//     tryTrade('https://raydium.rpcpool.com');
// }, 2000);



const Sol = require('@solana/web3.js');
const Pool = require('@project-serum/pool');
const Serum = require ('@project-serum/serum');
const BN = require("bn.js");

async function tryTrade () {
    let conn = new Sol.Connection('https://solana-api.projectserum.com/');
    //https://solana-api.projectserum.com/
    //https://mainnet-beta.solana.com
    let marketAddress = new Sol.PublicKey('2xiv8A5xrJ7RnGdxXB42uFEkYHJjszEhaJyKKt4WaLep');
    //this one works 2xiv8A5xrJ7RnGdxXB42uFEkYHJjszEhaJyKKt4WaLep
    let programId = new Sol.PublicKey('9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin');
    // let market = await Serum.Market.load(connection, marketAddress, undefined, programId );
    // console.log(market);
    // console.log(market.baseMintAddress._bn.toString());
    // console.log(market.quoteMintAddress);

    let guess = new Sol.PublicKey('4Sx1NLrQiK4b9FdLKe2DhQ9FHvRzJhzKN3LoD6BrEPnf');
    let poolInfo = await Pool.loadPoolInfo(conn, guess);
    console.log(poolInfo)
}

tryTrade();

    // let quote = new Sol.PublicKey('EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'); 
    // let base = new Sol.PublicKey('StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT');

    // let x  = await Serum.Market.findAccountsByMints(conn, base, quote, programId );

    // x.forEach(z => {
    //     console.log(z.publicKey.toBase58());
        
    // });
    // console.log(x);
    

    //step-usdc CLOB
    //97qCB4cAVSTthvJu3eNoEx6AY6DLuRDtCoPm5Tdyg77S

    //step-usdc pool and swap tabs
    //3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC




    // EPF9hqwwFDefHcj6kBGSisdJ6fisXYBEcVYYsto6owCH no
    // 4LSiWevYQevJTA2rNPa4eoGYDA9Trf7zYEXB1ao2Grtb no
    // 4LSiWevYQevJTA2rNPa4eoGYDA9Trf7zYEXB1ao2Grtb no
    // 7NNfC4anz7jiJehdKYCgLvo9qePB75k6ZNQKSF9KVkcA no
    // 6GKo4Qr7pszjnR6eefH5xTfkYkN9AsQncyS9GnZNDU3Z no
    // 97qCB4cAVSTthvJu3eNoEx6AY6DLuRDtCoPm5Tdyg77S Serum Market
    // 3Zm6fjjTmhQ7s9EfLgPGaCDvTn3oESFbq5XRDs1sRKEZ No
    // 5DjAgHBvhynA3AFQQmKa2drtci8FcxXnFxbZT3nn65Eo No

}


import { LiquidityPoolInfo, LIQUIDITY_POOL_PROGRAM_ID_V4, SERUM_PROGRAM_ID_V3 } from "./pool"
import { NATIVE_SOL } from "./tokens"

interface Tokens {
    [key: string]: any
    [index: number]: any
  }


export const TOKENS: Tokens = {
    USDC: {
      mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
      decimals: 6,
    },
    COIN: {
      mintAddress: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT',// HERE
      decimals: 9, // MER is 6, so is media, step is 9
    }
  }
  
  export const LP_TOKENS: Tokens = {
    'TOKEN': {
      coin: { ...TOKENS.COIN },
      pc: { ...TOKENS.USDC },
  
      mintAddress: '3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC', // HERE
      decimals: TOKENS.COIN.decimals
    }
  }

export const LPINFO = {
    coin: { ...TOKENS.COIN },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['TOKEN'] },

    version: 4,

    programId: LIQUIDITY_POOL_PROGRAM_ID_V4, // 0
    //1 Token program (idk where it comes from)
    ammId: '4Sx1NLrQiK4b9FdLKe2DhQ9FHvRzJhzKN3LoD6BrEPnf', //2
    ammAuthority: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1', //3
    ammOpenOrders: 'EXgME2sUuzBxEc2wuyoSZ8FZNZMC3ChhZgFZRAW3nCQG', //4
    ammTargetOrders: '78bwAGKJjaiPQqmwKmbj4fhrRTLAdzwqNwpFdpTzrhk1', //5
    poolCoinTokenAccount: '8Gf8Cc6yrxtfUZqM2vf2kg5uR9bGPfCHfzdYRVBAJSJj', //6
    poolPcTokenAccount: 'ApLc86fHjVbGbU9QFzNPNuWM5VYckZM92q6sgJN1SGYn', //7
    serumProgramId: SERUM_PROGRAM_ID_V3, //8
    serumMarket: '97qCB4cAVSTthvJu3eNoEx6AY6DLuRDtCoPm5Tdyg77S', //9
    serumBids: '5Xdpf7CMGFDkJj1smcVQAAZG6GY9gqAns18QLKbPZKsw', //10
    serumAsks: '6Tqwg8nrKJrcqsr4zR9wJuPv3iXsHAMN65FxwJ3RMH8S', //11
    serumEventQueue: '5frw4m8pEZHorTKVzmMzvf8xLUrj65vN7wA57KzaZFK3', //12
    serumCoinVaultAccount: 'CVNye3Xr9Jv26c8TVqZZHq4F43BhoWWfmrzyp1M9YA67', //13
    serumPcVaultAccount: 'AnGbReAhCDFkR83nB8mXTDX5dQJFB8Pwicu6pGMfCLjt', //14
    serumVaultSigner: 'FbwU5U1Doj2PSKRJi7pnCny4dFPPJURwALkFhHwdHaMW', //15
    //16 Account from which USDC was debited
    //17 Account from which MEDIA was debited
    //18 Owner of 17

  }

  export const swapInfo = {
    fromMint: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    userUSDC: '5UuT6nEQPGu8U4jbHqbkxfTdgF4rfSecJF8Cg1aokfhy',
    //below
    toMint: 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT',
    userCoinAccount: 'FtsduKNZPJicNhMYxPwpzkw1sFWiX85c36tJQ9JU5Nox'
  }


  export const LIQUIDITY_POOLS: LiquidityPoolInfo[] = [ LPINFO ]

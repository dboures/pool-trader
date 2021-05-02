import { LP_TOKENS, NATIVE_SOL, TOKENS, TokenInfo } from './tokens'

export const SERUM_PROGRAM_ID_V3 = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'
export const LIQUIDITY_POOL_PROGRAM_ID_V4 = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'

export function getAddressForWhat(address: string) {
  for (const pool of LIQUIDITY_POOLS) {
    for (const [key, value] of Object.entries(pool)) {
      if (key === 'lp') {
        if (value.mintAddress === address) {
          return { key: 'lpMintAddress', lpMintAddress: pool.lp.mintAddress, version: pool.version }
        }
      } else if (value === address) {
        return { key, lpMintAddress: pool.lp.mintAddress, version: pool.version }
      }
    }
  }

  return {}
}

export interface LiquidityPoolInfo {
    name: string
    coin: TokenInfo
    pc: TokenInfo
    lp: TokenInfo
  
    version: number
    programId: string
  
    ammId: string
    ammAuthority: string
    ammOpenOrders: string
    ammTargetOrders: string
    ammQuantities: string
  
    poolCoinTokenAccount: string
    poolPcTokenAccount: string
    poolWithdrawQueue: string
    poolTempLpTokenAccount: string
  
    serumProgramId: string
    serumMarket: string
    serumBids?: string
    serumAsks?: string
    serumEventQueue?: string
    serumCoinVaultAccount: string
    serumPcVaultAccount: string
    serumVaultSigner: string
  }


//TODO: Change to media
export const MediaLPInfo = {
    name: 'STEP-USDC',
    coin: { ...TOKENS.STEP },
    pc: { ...TOKENS.USDC },
    lp: { ...LP_TOKENS['STEP-USDC-V4'] },

    version: 4,
    programId: LIQUIDITY_POOL_PROGRAM_ID_V4,

    ammId: '4Sx1NLrQiK4b9FdLKe2DhQ9FHvRzJhzKN3LoD6BrEPnf',
    ammAuthority: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
    ammOpenOrders: 'EXgME2sUuzBxEc2wuyoSZ8FZNZMC3ChhZgFZRAW3nCQG',
    ammTargetOrders: '78bwAGKJjaiPQqmwKmbj4fhrRTLAdzwqNwpFdpTzrhk1',
    // no need
    ammQuantities: NATIVE_SOL.mintAddress,
    poolCoinTokenAccount: '8Gf8Cc6yrxtfUZqM2vf2kg5uR9bGPfCHfzdYRVBAJSJj',
    poolPcTokenAccount: 'ApLc86fHjVbGbU9QFzNPNuWM5VYckZM92q6sgJN1SGYn',
    poolWithdrawQueue: '5bzBcB7cnJYGYvGPFxKcZETn6sGAyBbXgFhUbefbagYh',
    poolTempLpTokenAccount: 'CpfWKDYNYfvgk42tqR8HEHUWohGSJjASXfRBm3yaKJre',
    serumProgramId: SERUM_PROGRAM_ID_V3,
    serumMarket: '97qCB4cAVSTthvJu3eNoEx6AY6DLuRDtCoPm5Tdyg77S',
    serumBids: '5Xdpf7CMGFDkJj1smcVQAAZG6GY9gqAns18QLKbPZKsw',
    serumAsks: '6Tqwg8nrKJrcqsr4zR9wJuPv3iXsHAMN65FxwJ3RMH8S',
    serumEventQueue: '5frw4m8pEZHorTKVzmMzvf8xLUrj65vN7wA57KzaZFK3',
    serumCoinVaultAccount: 'CVNye3Xr9Jv26c8TVqZZHq4F43BhoWWfmrzyp1M9YA67',
    serumPcVaultAccount: 'AnGbReAhCDFkR83nB8mXTDX5dQJFB8Pwicu6pGMfCLjt',
    serumVaultSigner: 'FbwU5U1Doj2PSKRJi7pnCny4dFPPJURwALkFhHwdHaMW'
  }


  //TODO: Change to media
  export const LIQUIDITY_POOLS: LiquidityPoolInfo[] = [ MediaLPInfo ]
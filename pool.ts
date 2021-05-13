import { LIQUIDITY_POOLS } from './inputs';
import { TokenInfo } from './tokens'

export const SERUM_PROGRAM_ID_V3 = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'
export const LIQUIDITY_POOL_PROGRAM_ID_V4 = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'

export function getAddressForWhat(address: string) {
  for (const pool of LIQUIDITY_POOLS) {
    console.log(pool);
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

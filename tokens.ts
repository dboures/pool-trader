
import { BigNumber } from "bignumber.js";
import { cloneDeep } from 'lodash';
import { TOKENS } from "./inputs";

export class TokenAmount {
    public wei: BigNumber
  
    public decimals: number
    public _decimals: BigNumber
  
    constructor(wei: number | string | BigNumber, decimals: number = 0, isWei = true) {
      this.decimals = decimals
      this._decimals = new BigNumber(10).exponentiatedBy(decimals)
  
      if (isWei) {
        this.wei = new BigNumber(wei)
      } else {
        this.wei = new BigNumber(wei).multipliedBy(this._decimals)
      }
    }

    toWei() {
        return this.wei
      }
}

export const NATIVE_SOL: TokenInfo = {
    mintAddress: '11111111111111111111111111111111',
    decimals: 9
  }

export interface TokenInfo {
    symbol?: string
    name?: string
  
    mintAddress: string
    decimals: number
    totalSupply?: TokenAmount
  
    referrer?: string
  
    tokenAccountAddress?: string
    balance?: TokenAmount
  }

  /**
 * Get token use mint addresses

 * @param {string} mintAddress

 * @returns {TokenInfo | null} tokenInfo
 */
export function getTokenByMintAddress(mintAddress: string): TokenInfo | null {
    if (mintAddress === NATIVE_SOL.mintAddress) {
      return cloneDeep(NATIVE_SOL)
    }
  
    let token = null
  
    for (const symbol of Object.keys(TOKENS)) {
      const info = cloneDeep(TOKENS[symbol])
  
      if (info.mintAddress === mintAddress) {
        token = info
      }
    }
  
    return token
  }
  



  
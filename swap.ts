import { Account, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
// eslint-disable-next-line
import { NATIVE_SOL, TokenAmount } from './tokens'
import { initializeAccount } from '@project-serum/serum/lib/token-instructions'
import { swapInstruction } from './instructions'
import { sendTransaction } from './txns'
import { ACCOUNT_LAYOUT } from './layouts'
import { LPINFO } from './inputs'

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
export const MEMO_PROGRAM_ID = new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo')

export function getSwapOutAmount(
  poolInfo: any,
  fromCoinMint: string,
  toCoinMint: string,
  amount: string,
  slippage: number
) {
  // console.log(poolInfo);
  const { coin, pc, fees } = poolInfo
  const { swapFeeNumerator, swapFeeDenominator } = fees

  if (fromCoinMint === coin.mintAddress && toCoinMint === pc.mintAddress) {
    // coin2pc
    const fromAmount = new TokenAmount(amount, coin.decimals, false)
    const denominator = coin.balance.wei.plus(fromAmount.wei)
    const amountOut = pc.balance.wei.multipliedBy(fromAmount.wei).dividedBy(denominator)
    const amountOutWithFee = amountOut.dividedBy(swapFeeDenominator).multipliedBy(swapFeeDenominator - swapFeeNumerator)
    const amountOutWithSlippage = amountOutWithFee.dividedBy(100).multipliedBy(100 - slippage)
    return { amountIn: fromAmount, amountOut: new TokenAmount(amountOutWithSlippage, pc.decimals) }
  } else {
    // pc2coin
    const fromAmount = new TokenAmount(amount, pc.decimals, false)
    const denominator = pc.balance.wei.plus(fromAmount.wei)
    const amountOut = coin.balance.wei.multipliedBy(fromAmount.wei).dividedBy(denominator)
    const amountOutWithFee = amountOut.dividedBy(swapFeeDenominator).multipliedBy(swapFeeDenominator - swapFeeNumerator)
    const amountOutWithSlippage = amountOutWithFee.dividedBy(100).multipliedBy(100 - slippage)
    return { amountIn: fromAmount, amountOut: new TokenAmount(amountOutWithSlippage, coin.decimals) }
  }
}

export async function createProgramAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  programId: PublicKey,
  lamports: number | null,
  layout: any,

  transaction: Transaction,
  signer: Array<Account>
) {
  let publicKey

  if (account) {
    publicKey = new PublicKey(account)
  } else {
    const newAccount = new Account()
    publicKey = newAccount.publicKey

    transaction.add(
      SystemProgram.createAccount({
        fromPubkey: owner,
        newAccountPubkey: publicKey,
        lamports: lamports ?? (await connection.getMinimumBalanceForRentExemption(layout.span)),
        space: layout.span,
        programId
      })
    )

    signer.push(newAccount)
  }

  return publicKey
}

export async function createTokenAccountIfNotExist(
  connection: Connection,
  account: string | undefined | null,
  owner: PublicKey,
  mintAddress: string,
  lamports: number | null,

  transaction: Transaction,
  signer: Array<Account>
) {
  let publicKey

  if (account) {
    publicKey = new PublicKey(account)
  } else {
    publicKey = await createProgramAccountIfNotExist(
      connection,
      account,
      owner,
      TOKEN_PROGRAM_ID,
      lamports,
      ACCOUNT_LAYOUT,
      transaction,
      signer
    )

    transaction.add(
      initializeAccount({
        account: publicKey,
        mint: new PublicKey(mintAddress),
        owner
      })
    )
  }

  return publicKey
}

export async function swap(
    connection: Connection,
    walletOwner: string,
    privateKey: string | null,
    poolInfo: any,
    fromCoinMint: string,
    toCoinMint: string,
    fromTokenAccount: string,
    toTokenAccount: string,
    amount: string,
    slippage: number
  ) {
    const transaction = new Transaction()
    const signers: Account[] = []
  
    const owner = new PublicKey(walletOwner);

    // console.log(poolInfo);
    console.log('before swap amout');
    const { amountIn, amountOut } = getSwapOutAmount(poolInfo, fromCoinMint, toCoinMint, amount, slippage)
    console.log('have swap amout');
  
    let fromMint = fromCoinMint
    let toMint = toCoinMint

    // console.log('create new tokens');
    const newFromTokenAccount = await createTokenAccountIfNotExist(
      connection,
      fromTokenAccount,
      owner,
      fromMint,
      null,
      transaction,
      signers
    )
    const newToTokenAccount = await createTokenAccountIfNotExist(
      connection,
      toTokenAccount,
      owner,
      toMint,
      null,
      transaction,
      signers
    )
  
    // console.log('txn add');

    transaction.add(
      swapInstruction(
        new PublicKey(LPINFO.programId),
        new PublicKey(LPINFO.ammId),
        new PublicKey(LPINFO.ammAuthority),
        new PublicKey(LPINFO.ammOpenOrders),
        new PublicKey(LPINFO.ammTargetOrders),
        new PublicKey(LPINFO.poolCoinTokenAccount),
        new PublicKey(LPINFO.poolPcTokenAccount),
        new PublicKey(LPINFO.serumProgramId),
        new PublicKey(LPINFO.serumMarket),
        new PublicKey(LPINFO.serumBids),
        new PublicKey(LPINFO.serumAsks),
        new PublicKey(LPINFO.serumEventQueue),
        new PublicKey(LPINFO.serumCoinVaultAccount),
        new PublicKey(LPINFO.serumPcVaultAccount),
        new PublicKey(LPINFO.serumVaultSigner),
        newFromTokenAccount,
        newToTokenAccount,
        owner,
        Math.floor(amountIn.toWei().toNumber()),
        Math.floor(amountOut.toWei().toNumber())
      )
    )
  
    console.log('send txn');
    return await sendTransaction(connection, privateKey, transaction, signers) //signers is []
  }
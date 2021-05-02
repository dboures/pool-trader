import { Account, Connection, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
// eslint-disable-next-line
import { NATIVE_SOL, TOKENS, TokenAmount } from './tokens'
import { closeAccount, initializeAccount } from '@project-serum/serum/lib/token-instructions'
import { swapInstruction } from './instructions'
import { sendTransaction } from './txns'
import { MediaLPInfo } from './pool'
import { ACCOUNT_LAYOUT } from './layouts'

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')
export const MEMO_PROGRAM_ID = new PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo')

export const SERUM_PROGRAM_ID_V2 = 'EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o'
export const SERUM_PROGRAM_ID_V3 = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin'

export const LIQUIDITY_POOL_PROGRAM_ID_V2 = 'RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr'
export const LIQUIDITY_POOL_PROGRAM_ID_V3 = '27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv'
export const LIQUIDITY_POOL_PROGRAM_ID_V4 = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8'

export const STAKE_PROGRAM_ID = 'EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q'
export const STAKE_PROGRAM_ID_V4 = 'CBuCnLe26faBpcBP2fktp4rp8abpcAnTWft6ZrP5Q4T'
export const STAKE_PROGRAM_ID_V5 = '9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z'

export const IDO_PROGRAM_ID = '6FJon3QE27qgPVggARueB22hLvoh22VzJpXv4rBEoSLF'


export function getSwapOutAmount(
  poolInfo: any,
  fromCoinMint: string,
  toCoinMint: string,
  amount: string,
  slippage: number
) {
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
    // console.log('before swap amout');
    const { amountIn, amountOut } = getSwapOutAmount(poolInfo, fromCoinMint, toCoinMint, amount, slippage)
    // console.log('have swap amout');
  
    let fromMint = fromCoinMint
    let toMint = toCoinMint
  
    // console.log('mint checks');
    if (fromMint === NATIVE_SOL.mintAddress) {
      fromMint = TOKENS.WSOL.mintAddress
    }
    if (toMint === NATIVE_SOL.mintAddress) {
      toMint = TOKENS.WSOL.mintAddress
    }
  
    let wrappedSolAccount: PublicKey | null = null
    let wrappedSolAccount2: PublicKey | null = null
  
    if (fromCoinMint === NATIVE_SOL.mintAddress) {
      wrappedSolAccount = await createTokenAccountIfNotExist(
        connection,
        wrappedSolAccount?.toString(),
        owner,
        TOKENS.WSOL.mintAddress,
        amountIn.wei.toNumber() + 1e7,
        transaction,
        signers
      )
    }
    if (toCoinMint === NATIVE_SOL.mintAddress) {
      wrappedSolAccount2 = await createTokenAccountIfNotExist(
        connection,
        wrappedSolAccount2?.toString(),
        owner,
        TOKENS.WSOL.mintAddress,
        1e7,
        transaction,
        signers
      )
    }
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

    //TODO: Media Pool
    transaction.add(
      swapInstruction(
        new PublicKey(MediaLPInfo.programId),
        new PublicKey(MediaLPInfo.ammId),
        new PublicKey(MediaLPInfo.ammAuthority),
        new PublicKey(MediaLPInfo.ammOpenOrders),
        new PublicKey(MediaLPInfo.ammTargetOrders),
        new PublicKey(MediaLPInfo.poolCoinTokenAccount),
        new PublicKey(MediaLPInfo.poolPcTokenAccount),
        new PublicKey(MediaLPInfo.serumProgramId),
        new PublicKey(MediaLPInfo.serumMarket),
        new PublicKey(MediaLPInfo.serumBids),
        new PublicKey(MediaLPInfo.serumAsks),
        new PublicKey(MediaLPInfo.serumEventQueue),
        new PublicKey(MediaLPInfo.serumCoinVaultAccount),
        new PublicKey(MediaLPInfo.serumPcVaultAccount),
        new PublicKey(MediaLPInfo.serumVaultSigner),
        wrappedSolAccount ?? newFromTokenAccount,
        wrappedSolAccount2 ?? newToTokenAccount,
        owner,
        Math.floor(amountIn.toWei().toNumber()),
        Math.floor(amountOut.toWei().toNumber())
      )
    )
  
    if (wrappedSolAccount) {
      transaction.add(
        closeAccount({
          source: wrappedSolAccount,
          destination: owner,
          owner
        })
      )
    }
    if (wrappedSolAccount2) {
      transaction.add(
        closeAccount({
          source: wrappedSolAccount2,
          destination: owner,
          owner
        })
      )
    }
  
    // console.log('send txn');
    return await sendTransaction(connection, privateKey, transaction, signers) //signers is []
  }
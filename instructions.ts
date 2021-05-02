import { PublicKey, TransactionInstruction } from '@solana/web3.js'
// @ts-ignore
import { u8, nu64, struct } from 'buffer-layout'

export const TOKEN_PROGRAM_ID = new PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA')

export function swapInstruction(
    programId: PublicKey,
    // tokenProgramId: PublicKey,
    // amm
    ammId: PublicKey,
    ammAuthority: PublicKey,
    ammOpenOrders: PublicKey,
    ammTargetOrders: PublicKey,
    poolCoinTokenAccount: PublicKey,
    poolPcTokenAccount: PublicKey,
    // serum
    serumProgramId: PublicKey,
    serumMarket: PublicKey,
    serumBids: PublicKey,
    serumAsks: PublicKey,
    serumEventQueue: PublicKey,
    serumCoinVaultAccount: PublicKey,
    serumPcVaultAccount: PublicKey,
    serumVaultSigner: PublicKey,
    // user
    userSourceTokenAccount: PublicKey,
    userDestTokenAccount: PublicKey,
    userOwner: PublicKey,
  
    amountIn: number,
    minAmountOut: number
  ): TransactionInstruction {
    const dataLayout = struct([u8('instruction'), nu64('amountIn'), nu64('minAmountOut')])
  
    const keys = [
      // spl token
      { pubkey: TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
      // amm
      { pubkey: ammId, isSigner: false, isWritable: true },
      { pubkey: ammAuthority, isSigner: false, isWritable: true },
      { pubkey: ammOpenOrders, isSigner: false, isWritable: true },
      { pubkey: ammTargetOrders, isSigner: false, isWritable: true },
      { pubkey: poolCoinTokenAccount, isSigner: false, isWritable: true },
      { pubkey: poolPcTokenAccount, isSigner: false, isWritable: true },
      // serum
      { pubkey: serumProgramId, isSigner: false, isWritable: true },
      { pubkey: serumMarket, isSigner: false, isWritable: true },
      { pubkey: serumBids, isSigner: false, isWritable: true },
      { pubkey: serumAsks, isSigner: false, isWritable: true },
      { pubkey: serumEventQueue, isSigner: false, isWritable: true },
      { pubkey: serumCoinVaultAccount, isSigner: false, isWritable: true },
      { pubkey: serumPcVaultAccount, isSigner: false, isWritable: true },
      { pubkey: serumVaultSigner, isSigner: false, isWritable: true },
      { pubkey: userSourceTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userDestTokenAccount, isSigner: false, isWritable: true },
      { pubkey: userOwner, isSigner: true, isWritable: true }
    ]
  
    const data = Buffer.alloc(dataLayout.span)
    dataLayout.encode(
      {
        instruction: 9,
        amountIn,
        minAmountOut
      },
      data
    )
  
    return new TransactionInstruction({
      keys,
      programId,
      data
    })
  }
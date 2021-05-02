import { Account, Commitment, Connection, Transaction, TransactionSignature } from '@solana/web3.js'

export const commitment: Commitment = 'confirmed'

// transaction
export async function sendTransaction(
    connection: Connection,
    privateKey: string,
    transaction: Transaction,
    signers: Array<Account> = []
  ) {

    // console.log(signers);
    const privateKeyDecoded = privateKey.split(',').map(s => parseInt(s));
    const privAccount = new Account(privateKeyDecoded);

    signers.push(privAccount)
    // console.log(signers);

    const signedTransaction = await signTransaction(connection, transaction, signers)
    return await sendSignedTransaction(connection, signedTransaction)
  }


export async function signTransaction(
    connection: Connection,
    transaction: Transaction,
    signers: Array<Account> = []
  ) {
    transaction.recentBlockhash = (await connection.getRecentBlockhash(commitment)).blockhash
    transaction.sign(...signers);

    return transaction;

  }
  
  export async function sendSignedTransaction(connection: Connection, signedTransaction: Transaction): Promise<string> {
    const rawTransaction = signedTransaction.serialize();
  
    console.log('sending');
    const txid: TransactionSignature = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      preflightCommitment: commitment
    });
    // console.log('txn complete');
    console.log(txid);
  
    return txid
  }
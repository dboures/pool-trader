import { Account, Commitment, Connection, Transaction, TransactionSignature } from '@solana/web3.js'


export const commitment: Commitment = 'confirmed'

// transaction
export async function sendTransaction(
    connection: Connection,
    privateKey: string,
    transaction: Transaction,
    signers: Array<Account> = []
  ) {

    // how to sign transaction quickly??
    const privateKeyDecoded = privateKey.split(',').map(s => parseInt(s));
    const initializerAccount = new Account(privateKeyDecoded);

    const signedTransaction = await signTransaction(connection, wallet, transaction, signers)
    return await sendSignedTransaction(connection, signedTransaction)
  }


export async function signTransaction(
    connection: Connection,
    wallet: any,
    transaction: Transaction,
    signers: Array<Account> = []
  ) {
    transaction.recentBlockhash = (await connection.getRecentBlockhash(commitment)).blockhash
    transaction.setSigners(wallet.publicKey, ...signers.map((s) => s.publicKey))
    if (signers.length > 0) {
      transaction.partialSign(...signers)
    }


    // signTransaction = async (transaction) => {
    //   const response = await this._sendRequest('signTransaction', {
    //     message: bs58.encode(transaction.serializeMessage()),
    //   });
    //   const signature = bs58.decode(response.signature);
    //   const publicKey = new PublicKey(response.publicKey);
    //   transaction.addSignature(publicKey, signature);
    //   return transaction;
    // };

    return await wallet.signTransaction(transaction)
  }
  
  
  export async function sendSignedTransaction(connection: Connection, signedTransaction: Transaction): Promise<string> {
    const rawTransaction = signedTransaction.serialize()
  
    const txid: TransactionSignature = await connection.sendRawTransaction(rawTransaction, {
      skipPreflight: true,
      preflightCommitment: commitment
    })
  
    return txid
  }
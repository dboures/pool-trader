"use strict";
exports.__esModule = true;
var web3_js_1 = require("@solana/web3.js");
// @ts-ignore
var buffer_layout_1 = require("buffer-layout");
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
function swapInstruction(programId, 
// tokenProgramId: PublicKey,
// amm
ammId, ammAuthority, ammOpenOrders, ammTargetOrders, poolCoinTokenAccount, poolPcTokenAccount, 
// serum
serumProgramId, serumMarket, serumBids, serumAsks, serumEventQueue, serumCoinVaultAccount, serumPcVaultAccount, serumVaultSigner, 
// user
userSourceTokenAccount, userDestTokenAccount, userOwner, amountIn, minAmountOut) {
    var dataLayout = buffer_layout_1.struct([buffer_layout_1.u8('instruction'), buffer_layout_1.nu64('amountIn'), buffer_layout_1.nu64('minAmountOut')]);
    var keys = [
        // spl token
        { pubkey: exports.TOKEN_PROGRAM_ID, isSigner: false, isWritable: true },
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
    ];
    var data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({
        instruction: 9,
        amountIn: amountIn,
        minAmountOut: minAmountOut
    }, data);
    return new web3_js_1.TransactionInstruction({
        keys: keys,
        programId: programId,
        data: data
    });
}
exports.swapInstruction = swapInstruction;

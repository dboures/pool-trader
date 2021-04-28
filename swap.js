"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var web3_js_1 = require("@solana/web3.js");
// eslint-disable-next-line
var tokens_1 = require("./tokens");
var token_instructions_1 = require("@project-serum/serum/lib/token-instructions");
var instructions_1 = require("./instructions");
var txns_1 = require("./txns");
var pool_1 = require("./pool");
var layouts_1 = require("./layouts");
exports.TOKEN_PROGRAM_ID = new web3_js_1.PublicKey('TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA');
exports.MEMO_PROGRAM_ID = new web3_js_1.PublicKey('Memo1UhkJRfHyvLMcVucJwxXeuD728EqVDDwQDxFMNo');
exports.SERUM_PROGRAM_ID_V2 = 'EUqojwWA2rd19FZrzeBncJsm38Jm1hEhE3zsmX3bRc2o';
exports.SERUM_PROGRAM_ID_V3 = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin';
exports.LIQUIDITY_POOL_PROGRAM_ID_V2 = 'RVKd61ztZW9GUwhRbbLoYVRE5Xf1B2tVscKqwZqXgEr';
exports.LIQUIDITY_POOL_PROGRAM_ID_V3 = '27haf8L6oxUeXrHrgEgsexjSY5hbVUWEmvv9Nyxg8vQv';
exports.LIQUIDITY_POOL_PROGRAM_ID_V4 = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8';
exports.STAKE_PROGRAM_ID = 'EhhTKczWMGQt46ynNeRX1WfeagwwJd7ufHvCDjRxjo5Q';
exports.STAKE_PROGRAM_ID_V4 = 'CBuCnLe26faBpcBP2fktp4rp8abpcAnTWft6ZrP5Q4T';
exports.STAKE_PROGRAM_ID_V5 = '9KEPoZmtHUrBbhWN1v1KWLMkkvwY6WLtAVUCPRtRjP4z';
exports.IDO_PROGRAM_ID = '6FJon3QE27qgPVggARueB22hLvoh22VzJpXv4rBEoSLF';
function getSwapOutAmount(poolInfo, fromCoinMint, toCoinMint, amount, slippage) {
    var coin = poolInfo.coin, pc = poolInfo.pc, fees = poolInfo.fees;
    var swapFeeNumerator = fees.swapFeeNumerator, swapFeeDenominator = fees.swapFeeDenominator;
    if (fromCoinMint === coin.mintAddress && toCoinMint === pc.mintAddress) {
        // coin2pc
        var fromAmount = new tokens_1.TokenAmount(amount, coin.decimals, false);
        var denominator = coin.balance.wei.plus(fromAmount.wei);
        var amountOut = pc.balance.wei.multipliedBy(fromAmount.wei).dividedBy(denominator);
        var amountOutWithFee = amountOut.dividedBy(swapFeeDenominator).multipliedBy(swapFeeDenominator - swapFeeNumerator);
        var amountOutWithSlippage = amountOutWithFee.dividedBy(100).multipliedBy(100 - slippage);
        return { amountIn: fromAmount, amountOut: new tokens_1.TokenAmount(amountOutWithSlippage, pc.decimals) };
    }
    else {
        // pc2coin
        var fromAmount = new tokens_1.TokenAmount(amount, pc.decimals, false);
        var denominator = pc.balance.wei.plus(fromAmount.wei);
        var amountOut = coin.balance.wei.multipliedBy(fromAmount.wei).dividedBy(denominator);
        var amountOutWithFee = amountOut.dividedBy(swapFeeDenominator).multipliedBy(swapFeeDenominator - swapFeeNumerator);
        var amountOutWithSlippage = amountOutWithFee.dividedBy(100).multipliedBy(100 - slippage);
        return { amountIn: fromAmount, amountOut: new tokens_1.TokenAmount(amountOutWithSlippage, coin.decimals) };
    }
}
exports.getSwapOutAmount = getSwapOutAmount;
function createProgramAccountIfNotExist(connection, account, owner, programId, lamports, layout, transaction, signer) {
    return __awaiter(this, void 0, void 0, function () {
        var publicKey, newAccount, _a, _b, _c, _d, _e, _f;
        return __generator(this, function (_g) {
            switch (_g.label) {
                case 0:
                    if (!account) return [3 /*break*/, 1];
                    publicKey = new web3_js_1.PublicKey(account);
                    return [3 /*break*/, 5];
                case 1:
                    newAccount = new web3_js_1.Account();
                    publicKey = newAccount.publicKey;
                    _b = (_a = transaction).add;
                    _d = (_c = web3_js_1.SystemProgram).createAccount;
                    _e = {
                        fromPubkey: owner,
                        newAccountPubkey: publicKey
                    };
                    if (!(lamports !== null && lamports !== void 0)) return [3 /*break*/, 2];
                    _f = lamports;
                    return [3 /*break*/, 4];
                case 2: return [4 /*yield*/, connection.getMinimumBalanceForRentExemption(layout.span)];
                case 3:
                    _f = (_g.sent());
                    _g.label = 4;
                case 4:
                    _b.apply(_a, [_d.apply(_c, [(_e.lamports = _f,
                                _e.space = layout.span,
                                _e.programId = programId,
                                _e)])]);
                    signer.push(newAccount);
                    _g.label = 5;
                case 5: return [2 /*return*/, publicKey];
            }
        });
    });
}
exports.createProgramAccountIfNotExist = createProgramAccountIfNotExist;
function createTokenAccountIfNotExist(connection, account, owner, mintAddress, lamports, transaction, signer) {
    return __awaiter(this, void 0, void 0, function () {
        var publicKey;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!account) return [3 /*break*/, 1];
                    publicKey = new web3_js_1.PublicKey(account);
                    return [3 /*break*/, 3];
                case 1: return [4 /*yield*/, createProgramAccountIfNotExist(connection, account, owner, exports.TOKEN_PROGRAM_ID, lamports, layouts_1.ACCOUNT_LAYOUT, transaction, signer)];
                case 2:
                    publicKey = _a.sent();
                    transaction.add(token_instructions_1.initializeAccount({
                        account: publicKey,
                        mint: new web3_js_1.PublicKey(mintAddress),
                        owner: owner
                    }));
                    _a.label = 3;
                case 3: return [2 /*return*/, publicKey];
            }
        });
    });
}
exports.createTokenAccountIfNotExist = createTokenAccountIfNotExist;
function swap(connection, walletOwner, poolInfo, fromCoinMint, toCoinMint, fromTokenAccount, toTokenAccount, amount, slippage) {
    return __awaiter(this, void 0, void 0, function () {
        var transaction, signers, owner, _a, amountIn, amountOut, fromMint, toMint, wrappedSolAccount, wrappedSolAccount2, newFromTokenAccount, newToTokenAccount;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    transaction = new web3_js_1.Transaction();
                    signers = [];
                    owner = new web3_js_1.PublicKey(walletOwner);
                    // console.log(poolInfo);
                    console.log('before swap amout');
                    _a = getSwapOutAmount(poolInfo, fromCoinMint, toCoinMint, amount, slippage), amountIn = _a.amountIn, amountOut = _a.amountOut;
                    console.log('have swap amout');
                    fromMint = fromCoinMint;
                    toMint = toCoinMint;
                    console.log('mint checks');
                    if (fromMint === tokens_1.NATIVE_SOL.mintAddress) {
                        fromMint = tokens_1.TOKENS.WSOL.mintAddress;
                    }
                    if (toMint === tokens_1.NATIVE_SOL.mintAddress) {
                        toMint = tokens_1.TOKENS.WSOL.mintAddress;
                    }
                    wrappedSolAccount = null;
                    wrappedSolAccount2 = null;
                    if (!(fromCoinMint === tokens_1.NATIVE_SOL.mintAddress)) return [3 /*break*/, 2];
                    return [4 /*yield*/, createTokenAccountIfNotExist(connection, wrappedSolAccount === null || wrappedSolAccount === void 0 ? void 0 : wrappedSolAccount.toString(), // TODO: did it fuck up
                        owner, tokens_1.TOKENS.WSOL.mintAddress, amountIn.wei.toNumber() + 1e7, transaction, signers)];
                case 1:
                    wrappedSolAccount = _b.sent();
                    _b.label = 2;
                case 2:
                    if (!(toCoinMint === tokens_1.NATIVE_SOL.mintAddress)) return [3 /*break*/, 4];
                    return [4 /*yield*/, createTokenAccountIfNotExist(connection, wrappedSolAccount2 === null || wrappedSolAccount2 === void 0 ? void 0 : wrappedSolAccount2.toString(), owner, tokens_1.TOKENS.WSOL.mintAddress, 1e7, transaction, signers)];
                case 3:
                    wrappedSolAccount2 = _b.sent();
                    _b.label = 4;
                case 4:
                    console.log('create new tokens');
                    return [4 /*yield*/, createTokenAccountIfNotExist(connection, fromTokenAccount, owner, fromMint, null, transaction, signers)];
                case 5:
                    newFromTokenAccount = _b.sent();
                    return [4 /*yield*/, createTokenAccountIfNotExist(connection, toTokenAccount, owner, toMint, null, transaction, signers)];
                case 6:
                    newToTokenAccount = _b.sent();
                    console.log('txn add');
                    //TODO: Media Pool
                    transaction.add(instructions_1.swapInstruction(new web3_js_1.PublicKey(pool_1.StepLPInfo.programId), new web3_js_1.PublicKey(pool_1.StepLPInfo.ammId), new web3_js_1.PublicKey(pool_1.StepLPInfo.ammAuthority), new web3_js_1.PublicKey(pool_1.StepLPInfo.ammOpenOrders), new web3_js_1.PublicKey(pool_1.StepLPInfo.ammTargetOrders), new web3_js_1.PublicKey(pool_1.StepLPInfo.poolCoinTokenAccount), new web3_js_1.PublicKey(pool_1.StepLPInfo.poolPcTokenAccount), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumProgramId), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumMarket), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumBids), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumAsks), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumEventQueue), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumCoinVaultAccount), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumPcVaultAccount), new web3_js_1.PublicKey(pool_1.StepLPInfo.serumVaultSigner), wrappedSolAccount !== null && wrappedSolAccount !== void 0 ? wrappedSolAccount : newFromTokenAccount, wrappedSolAccount2 !== null && wrappedSolAccount2 !== void 0 ? wrappedSolAccount2 : newToTokenAccount, owner, Math.floor(amountIn.toWei().toNumber()), Math.floor(amountOut.toWei().toNumber())));
                    if (wrappedSolAccount) {
                        transaction.add(token_instructions_1.closeAccount({
                            source: wrappedSolAccount,
                            destination: owner,
                            owner: owner
                        }));
                    }
                    if (wrappedSolAccount2) {
                        transaction.add(token_instructions_1.closeAccount({
                            source: wrappedSolAccount2,
                            destination: owner,
                            owner: owner
                        }));
                    }
                    console.log('send txn');
                    return [4 /*yield*/, txns_1.sendTransaction(connection, null, transaction, signers)]; // write our own
                case 7: return [2 /*return*/, _b.sent()]; // write our own
            }
        });
    });
}
exports.swap = swap;

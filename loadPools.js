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
var pool_1 = require("./pool");
var web3_js_1 = require("@solana/web3.js");
var serum_1 = require("@project-serum/serum");
var tokens_1 = require("./tokens");
var superstruct_1 = require("superstruct");
var layouts_1 = require("./layouts");
var lodash_1 = require("lodash");
// eslint-disable-next-line
var assert = require('assert');
exports.commitment = 'confirmed';
function jsonRpcResult(resultDescription) {
    var jsonRpcVersion = superstruct_1.struct.literal('2.0');
    return superstruct_1.struct.union([
        superstruct_1.struct({
            jsonrpc: jsonRpcVersion,
            id: 'string',
            error: 'any'
        }),
        superstruct_1.struct({
            jsonrpc: jsonRpcVersion,
            id: 'string',
            error: 'null?',
            result: resultDescription
        })
    ]);
}
function jsonRpcResultAndContext(resultDescription) {
    return jsonRpcResult({
        context: superstruct_1.struct({
            slot: 'number'
        }),
        value: resultDescription
    });
}
var AccountInfoResult = superstruct_1.struct({
    executable: 'boolean',
    owner: 'string',
    lamports: 'number',
    data: 'any',
    rentEpoch: 'number?'
});
var GetMultipleAccountsAndContextRpcResult = jsonRpcResultAndContext(superstruct_1.struct.array([superstruct_1.struct.union(['null', AccountInfoResult])]));
// getMultipleAccounts
function getMultipleAccounts(connection, publicKeys, commitment) {
    return __awaiter(this, void 0, void 0, function () {
        var keys, tempKeys, accounts, _i, keys_1, key, args, unsafeRes, res, _a, _b, account, value, executable, owner, lamports, data;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    keys = [];
                    tempKeys = [];
                    publicKeys.forEach(function (k) {
                        if (tempKeys.length >= 100) {
                            keys.push(tempKeys);
                            tempKeys = [];
                        }
                        tempKeys.push(k.toBase58());
                    });
                    if (tempKeys.length > 0) {
                        keys.push(tempKeys);
                    }
                    accounts = [];
                    _i = 0, keys_1 = keys;
                    _c.label = 1;
                case 1:
                    if (!(_i < keys_1.length)) return [3 /*break*/, 4];
                    key = keys_1[_i];
                    args = [key, { commitment: commitment }];
                    return [4 /*yield*/, connection._rpcRequest('getMultipleAccounts', args)];
                case 2:
                    unsafeRes = _c.sent();
                    res = GetMultipleAccountsAndContextRpcResult(unsafeRes);
                    if (res.error) {
                        throw new Error('failed to get info about accounts ' + publicKeys.map(function (k) { return k.toBase58(); }).join(', ') + ': ' + res.error.message);
                    }
                    assert(typeof res.result !== 'undefined');
                    for (_a = 0, _b = res.result.value; _a < _b.length; _a++) {
                        account = _b[_a];
                        value = null;
                        if (account === null) {
                            accounts.push(null);
                            continue;
                        }
                        if (res.result.value) {
                            executable = account.executable, owner = account.owner, lamports = account.lamports, data = account.data;
                            assert(data[1] === 'base64');
                            value = {
                                executable: executable,
                                owner: new web3_js_1.PublicKey(owner),
                                lamports: lamports,
                                data: Buffer.from(data[0], 'base64')
                            };
                        }
                        if (value === null) {
                            throw new Error('Invalid response');
                        }
                        accounts.push(value);
                    }
                    _c.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, accounts.map(function (account, idx) {
                        if (account === null) {
                            return null;
                        }
                        return {
                            publicKey: publicKeys[idx],
                            account: account
                        };
                    })];
            }
        });
    });
}
exports.getMultipleAccounts = getMultipleAccounts;
function loadPools(conn) {
    return __awaiter(this, void 0, void 0, function () {
        var liquidityPools, publicKeys, multipleInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    liquidityPools = {};
                    publicKeys = [];
                    pool_1.LIQUIDITY_POOLS.forEach(function (pool) {
                        var poolCoinTokenAccount = pool.poolCoinTokenAccount, poolPcTokenAccount = pool.poolPcTokenAccount, ammOpenOrders = pool.ammOpenOrders, ammId = pool.ammId, coin = pool.coin, pc = pool.pc, lp = pool.lp;
                        publicKeys.push(new web3_js_1.PublicKey(poolCoinTokenAccount), new web3_js_1.PublicKey(poolPcTokenAccount), new web3_js_1.PublicKey(ammOpenOrders), new web3_js_1.PublicKey(ammId), new web3_js_1.PublicKey(lp.mintAddress));
                        var poolInfo = lodash_1.cloneDeep(pool);
                        poolInfo.coin.balance = new tokens_1.TokenAmount(0, coin.decimals);
                        poolInfo.pc.balance = new tokens_1.TokenAmount(0, pc.decimals);
                        liquidityPools[lp.mintAddress] = poolInfo;
                    });
                    console.log(publicKeys);
                    return [4 /*yield*/, getMultipleAccounts(conn, publicKeys, exports.commitment)];
                case 1:
                    multipleInfo = _a.sent();
                    multipleInfo.forEach(function (info) {
                        if (info) {
                            var address = info.publicKey.toBase58();
                            var data = Buffer.from(info.account.data);
                            var _a = pool_1.getAddressForWhat(address), key = _a.key, lpMintAddress = _a.lpMintAddress, version = _a.version;
                            if (key && lpMintAddress) {
                                var poolInfo = liquidityPools[lpMintAddress];
                                switch (key) {
                                    case 'poolCoinTokenAccount': {
                                        var parsed = layouts_1.ACCOUNT_LAYOUT.decode(data);
                                        poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus(parsed.amount.toString());
                                        break;
                                    }
                                    case 'poolPcTokenAccount': {
                                        var parsed = layouts_1.ACCOUNT_LAYOUT.decode(data);
                                        poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus(parsed.amount.toNumber());
                                        break;
                                    }
                                    case 'ammOpenOrders': {
                                        var OPEN_ORDERS_LAYOUT = serum_1.OpenOrders.getLayout(new web3_js_1.PublicKey(poolInfo.serumProgramId));
                                        var parsed = OPEN_ORDERS_LAYOUT.decode(data);
                                        var baseTokenTotal = parsed.baseTokenTotal, quoteTokenTotal = parsed.quoteTokenTotal;
                                        poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.plus(baseTokenTotal.toNumber());
                                        poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.plus(quoteTokenTotal.toNumber());
                                        break;
                                    }
                                    case 'ammId': {
                                        var parsed = void 0;
                                        if (version === 2) {
                                            parsed = layouts_1.AMM_INFO_LAYOUT.decode(data);
                                        }
                                        else if (version === 3) {
                                            parsed = layouts_1.AMM_INFO_LAYOUT_V3.decode(data);
                                        }
                                        else {
                                            parsed = layouts_1.AMM_INFO_LAYOUT_V4.decode(data);
                                            var swapFeeNumerator = parsed.swapFeeNumerator, swapFeeDenominator = parsed.swapFeeDenominator;
                                            poolInfo.fees = {
                                                swapFeeNumerator: swapFeeNumerator.toNumber(),
                                                swapFeeDenominator: swapFeeDenominator.toNumber()
                                            };
                                        }
                                        var needTakePnlCoin = parsed.needTakePnlCoin, needTakePnlPc = parsed.needTakePnlPc;
                                        poolInfo.coin.balance.wei = poolInfo.coin.balance.wei.minus(needTakePnlCoin.toNumber());
                                        poolInfo.pc.balance.wei = poolInfo.pc.balance.wei.minus(needTakePnlPc.toNumber());
                                        break;
                                    }
                                    // getLpSupply
                                    case 'lpMintAddress': {
                                        var parsed = layouts_1.MINT_LAYOUT.decode(data);
                                        poolInfo.lp.totalSupply = new tokens_1.TokenAmount(parsed.supply.toNumber(), poolInfo.lp.decimals);
                                        break;
                                    }
                                }
                            }
                        }
                    });
                    return [2 /*return*/, liquidityPools];
            }
        });
    });
}
exports.loadPools = loadPools;

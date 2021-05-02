"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var tokens_1 = require("./tokens");
exports.SERUM_PROGRAM_ID_V3 = '9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin';
exports.LIQUIDITY_POOL_PROGRAM_ID_V4 = '675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8';
function getAddressForWhat(address) {
    for (var _i = 0, LIQUIDITY_POOLS_1 = exports.LIQUIDITY_POOLS; _i < LIQUIDITY_POOLS_1.length; _i++) {
        var pool = LIQUIDITY_POOLS_1[_i];
        for (var _a = 0, _b = Object.entries(pool); _a < _b.length; _a++) {
            var _c = _b[_a], key = _c[0], value = _c[1];
            if (key === 'lp') {
                if (value.mintAddress === address) {
                    return { key: 'lpMintAddress', lpMintAddress: pool.lp.mintAddress, version: pool.version };
                }
            }
            else if (value === address) {
                return { key: key, lpMintAddress: pool.lp.mintAddress, version: pool.version };
            }
        }
    }
    return {};
}
exports.getAddressForWhat = getAddressForWhat;
//TODO: Change to media
exports.MediaLPInfo = {
    name: 'STEP-USDC',
    coin: __assign({}, tokens_1.TOKENS.STEP),
    pc: __assign({}, tokens_1.TOKENS.USDC),
    lp: __assign({}, tokens_1.LP_TOKENS['STEP-USDC-V4']),
    version: 4,
    programId: exports.LIQUIDITY_POOL_PROGRAM_ID_V4,
    ammId: '4Sx1NLrQiK4b9FdLKe2DhQ9FHvRzJhzKN3LoD6BrEPnf',
    ammAuthority: '5Q544fKrFoe6tsEbD7S8EmxGTJYAKtTVhAW5Q5pge4j1',
    ammOpenOrders: 'EXgME2sUuzBxEc2wuyoSZ8FZNZMC3ChhZgFZRAW3nCQG',
    ammTargetOrders: '78bwAGKJjaiPQqmwKmbj4fhrRTLAdzwqNwpFdpTzrhk1',
    // no need
    ammQuantities: tokens_1.NATIVE_SOL.mintAddress,
    poolCoinTokenAccount: '8Gf8Cc6yrxtfUZqM2vf2kg5uR9bGPfCHfzdYRVBAJSJj',
    poolPcTokenAccount: 'ApLc86fHjVbGbU9QFzNPNuWM5VYckZM92q6sgJN1SGYn',
    poolWithdrawQueue: '5bzBcB7cnJYGYvGPFxKcZETn6sGAyBbXgFhUbefbagYh',
    poolTempLpTokenAccount: 'CpfWKDYNYfvgk42tqR8HEHUWohGSJjASXfRBm3yaKJre',
    serumProgramId: exports.SERUM_PROGRAM_ID_V3,
    serumMarket: '97qCB4cAVSTthvJu3eNoEx6AY6DLuRDtCoPm5Tdyg77S',
    serumBids: '5Xdpf7CMGFDkJj1smcVQAAZG6GY9gqAns18QLKbPZKsw',
    serumAsks: '6Tqwg8nrKJrcqsr4zR9wJuPv3iXsHAMN65FxwJ3RMH8S',
    serumEventQueue: '5frw4m8pEZHorTKVzmMzvf8xLUrj65vN7wA57KzaZFK3',
    serumCoinVaultAccount: 'CVNye3Xr9Jv26c8TVqZZHq4F43BhoWWfmrzyp1M9YA67',
    serumPcVaultAccount: 'AnGbReAhCDFkR83nB8mXTDX5dQJFB8Pwicu6pGMfCLjt',
    serumVaultSigner: 'FbwU5U1Doj2PSKRJi7pnCny4dFPPJURwALkFhHwdHaMW'
};
//TODO: Change to media
exports.LIQUIDITY_POOLS = [exports.MediaLPInfo];

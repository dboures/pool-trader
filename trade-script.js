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
var swap_1 = require("./swap");
var loadPools_1 = require("./loadPools");
// export const STAKE_INFO_LAYOUT_V4 = struct([
//     u64('state'),
//     u64('nonce'),
//     publicKey('poolLpTokenAccount'),
//     publicKey('poolRewardTokenAccount'),
//     u64('totalReward'),
//     u128('perShare'),
//     u64('perBlock'),
//     u8('option'),
//     publicKey('poolRewardTokenAccountB'),
//     blob(7),
//     u64('totalRewardB'),
//     u128('perShareB'),
//     u64('perBlockB'),
//     u64('lastBlock'),
//     publicKey('owner')
//   ])
// export const USER_STAKE_INFO_ACCOUNT_LAYOUT_V4 = struct([
//     u64('state'),
//     publicKey('poolId'),
//     publicKey('stakerOwner'),
//     u64('depositBalance'),
//     u64('rewardDebt'),
//     u64('rewardDebtB')
//   ])
//pubKey = 8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV
function tryTrade() {
    return __awaiter(this, void 0, void 0, function () {
        var conn, accountId, pools;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conn = new web3_js_1.Connection('https://solana-api.projectserum.com/');
                    accountId = 'CBuCnLe26faBpcBP2fktp4rp8abpcAnTWft6ZrP5Q4T';
                    return [4 /*yield*/, loadPools_1.loadPools(conn)];
                case 1:
                    pools = _a.sent();
                    console.log(pools);
                    //swap
                    return [4 /*yield*/, swap_1.swap(conn, '8eSs9VWE3CtURT1Go754RU76X3n1UyDMeFwf9qswq4MV', //Owner 
                        //private key
                        pools['3k8BDobgihmk72jVmXYLE168bxxQUhqqyESW4dQVktqC'], 
                        // from USDC into STEP
                        //from, to ,mints
                        'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', 'StepAscQoEioFxxWGnh2sLBDFp9d8rvKz2Yp39iDpyT', 
                        //ours
                        '5UuT6nEQPGu8U4jbHqbkxfTdgF4rfSecJF8Cg1aokfhy', 'FtsduKNZPJicNhMYxPwpzkw1sFWiX85c36tJQ9JU5Nox', '0.1', 5)];
                case 2:
                    //swap
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
tryTrade();

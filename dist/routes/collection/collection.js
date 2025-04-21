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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectionRouter = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("../../utils/db");
exports.collectionRouter = express_1.default.Router();
exports.collectionRouter.get("/:name", (req, res) => {
    const name = req.params.name;
    res.send(`we are on path ${name}`);
});
exports.collectionRouter.post("/create-collection", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const client = yield (0, db_1.getClient)();
        const insertCollectionText = `
            INSERT INTO platformCollection(
             platformName, 
             collectionSymbol, 
             accountRoyalty, 
             chain, 
             accountType, 
             websiteLink, 
             description, 
             backgroungImg, 
             profileImg
           ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
        const collectionValues = [
            data.platformName,
            data.collectionSymbol,
            data.accountRoyalty,
            data.chain,
            data.accountType,
            data.websiteLink,
            data.description,
            data.backgroungImg,
            data.profileImg
        ];
        const queryRes = yield client.query(insertCollectionText, collectionValues);
        client.end();
    }
    catch (err) {
        console.log("error", err);
        res.status(403).json({
            message: "error",
            errorMes: err
        });
        return;
    }
    res.status(200).json({
        message: "Collection Created Successfully"
    });
    return;
}));
exports.collectionRouter.post("/create-account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    console.log(data);
    try {
        const client = yield (0, db_1.getClient)();
        const insertCollectionText = `
            INSERT INTO collectionAccount(
             accountName, 
             collection, 
             royalty, 
             type, 
             supply, 
             traits, 
             description, 
             backgroungImg, 
             profileImg
           ) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id`;
        const collectionValues = [
            data.accountName,
            data.collection,
            data.royalty,
            data.type,
            data.supply,
            data.traits,
            data.description,
            data.backgroungImg,
            data.profileImg
        ];
        const queryRes = yield client.query(insertCollectionText, collectionValues);
        client.end();
    }
    catch (err) {
        console.log("error", err);
        res.status(403).json({
            message: "error",
            errorMes: err
        });
        return;
    }
    res.status(200).json({
        message: "Collection Account Created Successfully"
    });
    return;
}));

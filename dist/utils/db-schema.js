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
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
function createTable() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = yield (0, db_1.getClient)();
        const createPlatformCollectionTableQuery = `
        CREATE TABLE IF NOT EXISTS platformCollection (
            id SERIAL PRIMARY KEY,
            platformName VARCHAR(255) NOT NULL,
            collectionSymbol VARCHAR(255) NOT NULL,
            accountRoyalty VARCHAR(255) NOT NULL,
            chain VARCHAR(255) NOT NULL,
            accountType VARCHAR(255) NOT NULL,
            websiteLink VARCHAR(255),
            description VARCHAR(255),
            backgroungImg VARCHAR(255),
            profileImg VARCHAR(255) NOT NULL
        );
    `;
        yield client.query(createPlatformCollectionTableQuery);
        const createCollectionAccountTableQuery = `
        CREATE TABLE IF NOT EXISTS collectionAccount (
            id SERIAL PRIMARY KEY,
            accountName VARCHAR(255) NOT NULL,
            collection VARCHAR(255) NOT NULL,
            royalty VARCHAR(255) NOT NULL,
            type VARCHAR(255) NOT NULL,
            supply VARCHAR(255) NOT NULL,
            traits VARCHAR(255),
            description VARCHAR(255),
            backgroungImg VARCHAR(255),
            profileImg VARCHAR(255) NOT NULL
        );
    `;
        yield client.query(createCollectionAccountTableQuery);
        console.log("Table Created Successfully!");
        client.end();
    });
}
createTable();

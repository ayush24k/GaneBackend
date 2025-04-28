import express from "express";
import { getClient } from "../../utils/db";
import { getCollectionByChainAndAddress, getNFTByCollectionAndTokenId, getNFTsByCollection } from "./collection.func";

export const collectionRouter = express.Router();

collectionRouter.get("/:name", (req, res) => {
    const name = req.params.name;
    res.send(`we are on path ${name}`)
})

// post collection handles

collectionRouter.post("/create-collection", async (req, res) => {

    // for help change when req body is changed from frontend
    interface CollectionBodyData {
        platformName: string;
        collectionSymbol: string;
        accountRoyalty: string;
        chain: string;
        accountType: string;
        websiteLink?: string;
        description?: string;
        backgroungImg?: string;
        profileImg?: string;
    }

    const data: CollectionBodyData = req.body;
    console.log(data);

    try {
        const client = await getClient();
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

        const queryRes = await client.query(insertCollectionText, collectionValues);
        client.end();
    } catch (err) {
        console.log("error", err);
        res.status(403).json({
            message: "error",
            errorMes: err
        })
        return;
    }

    res.status(200).json({
        message: "Collection Created Successfully"
    })
    return;
})

collectionRouter.post("/create-account", async (req, res) => {
    //change when req body is changed from frontend
    interface AccountBodyData {
        accountName: string;
        collection: string;
        royalty: string;
        type: string;
        supply: string;
        traits?: string;
        description?: string;
        backgroungImg?: string;
        profileImg?: string;
    }

    const data: AccountBodyData = req.body;
    console.log(data);

    try {
        const client = await getClient();
        const insertAccountText = `
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

        const accountValues = [
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

        const queryRes = await client.query(insertAccountText, accountValues);
        client.end();
    } catch (err) {
        console.log("error", err);
        res.status(403).json({
            message: "error",
            errorMes: err
        })
        return;
    }

    res.status(200).json({
        message: "Collection Account Created Successfully"
    })
    return;
})

// get collectuon handles
collectionRouter.get('/:chainId/:address', async (req, res) => {
    const { chainId, address } = req.params;

    // change later
    const page = 10;
    const pageSize = 20;

    try {
        const collection = await getCollectionByChainAndAddress(chainId, address);
        if (!collection) {
            res.status(404).json({ error: 'collection not found' });
            return;
        }
        const [nfts, total] = await getNFTsByCollection(chainId, address, page, pageSize);
        res.status(200).json({
            collection,
            nfts,
            total,
            page,
        });
    } catch (error) {
        console.error("Error getting collection:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// get nft by collection and Token
collectionRouter.get('/:chainId/:address/nft/:tokenId', async (req, res) => {
    const { chainId, address, tokenId } = req.params;
    try {
        const nft = await getNFTByCollectionAndTokenId(chainId, address, tokenId);
        if (!nft) {
            res.status(404).json({ error: 'nft not found' });
            return;
        }
        res.status(200).json(nft);
    } catch (error) {
        console.error("Error getting NFT:", error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

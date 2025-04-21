import express from "express";
import { getClient } from "../../utils/db";

export const collectionRouter = express.Router();

collectionRouter.get("/:name", (req, res) => {
    const name = req.params.name;
    res.send(`we are on path ${name}`)
})

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


import express from "express";

export const collectionRouter = express.Router();

collectionRouter.get("/:name", (req, res) => {
    const name = req.params.name;
    res.send(`we are on path ${name}`)
})

collectionRouter.post("/create", (req, res) => {
    const data = req.body;
    console.log(data);

    res.json({
        message: "success"
    })
})


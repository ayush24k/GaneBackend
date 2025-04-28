import { getClient } from "../../utils/db";


export async function getCollectionByChainAndAddress(chainId: string, address: string) {
    const client = await getClient();
    try {
        const queryText = 'SELECT * FROM collections WHERE chain = $1 AND contract_address = $2';
        const values = [chainId, address];
        const res = await client.query(queryText, values);

        if (res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    } finally {
        client.end();
    }
}

export async function getNFTsByCollection(chainId:any, address:any, page:any, pageSize:any) {
    const offset = (page - 1) * pageSize;
    const client = await getClient();
    try {
        const queryText = `
        SELECT n.id, n.token_id, n.collection_id, n.owner_id, n.metadata_uri, n.image_url, n.name, n.description, n.minted_at, n.tba_address
        FROM nfts n 
        JOIN collections c ON n.collection_id = c.id 
        WHERE c.chain = $1 AND c.contract_address = $2
        ORDER BY n.minted_at DESC
        LIMIT $3 OFFSET $4`;
        const res = await client.query(queryText, [chainId, address, pageSize, offset]);
        const countQueryText = `SELECT COUNT(*) FROM nfts WHERE collection_id IN (SELECT id FROM collections WHERE chain = $1 AND contract_address = $2)`
        const countRes = await client.query(countQueryText, [chainId, address])
        return [res.rows, parseInt(countRes.rows[0].count)] ;
    } finally {
        client.end();
    }
}

export async function getNFTByCollectionAndTokenId(chainId: string, address: string, tokenId:any) {
    const client = await getClient();
    try {
        const queryText = `SELECT n.id, n.token_id, n.collection_id, n.owner_id, n.metadata_uri, n.image_url, n.name, n.description, n.minted_at, n.tba_address
        FROM nfts n 
        JOIN collections c ON n.collection_id = c.id 
        WHERE c.chain = $1 AND c.contract_address = $2 AND n.token_id = $3`;
        const res = await client.query(queryText, [chainId, address, tokenId]);
        if (res.rows.length === 0) {
            return null;
        }
        return res.rows[0];
    } finally {
        client.end();
    }
}
import { Pool } from 'pg';
import dotenv from "dotenv";
dotenv.config();


export async function getClient() {
    const client = new Pool({
        connectionString: process.env.DB_LINK_PG,
    });

    try {
        return client;
    } catch (err) {
        console.log("error", err);
        throw err;
    }
}
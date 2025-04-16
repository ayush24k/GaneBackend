import { getClient } from "./db";


async function createTable() {
    const client = await getClient();

    const createTestTableQuery = `
        CREATE TABLE IF NOT EXISTS Test (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            name VARCHAR(255) NOT NULL
        );
    `;

    await client.query(createTestTableQuery);

    console.log("Table Created Successfully!");

    client.end();
}

createTable();
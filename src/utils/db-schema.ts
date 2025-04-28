import { getClient } from "./db";


async function createTable() {
    const client = await getClient();

    const createUserTableQuery = `
        CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            wallet_address VARCHAR(55) UNIQUE NOT NULL,
            username TEXT,
            email TEXT,
            bio TEXT,
            profile_image TEXT,
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    await client.query(createUserTableQuery);

    const createCollectionTableQuery = `
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
            profileImg VARCHAR(255) NOT NULL,
            creatorId INTEGER REFERENCES users(id),
            created_at TIMESTAMP DEFAULT NOW()
        );
    `;

    await client.query(createCollectionTableQuery);

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
            profileImg VARCHAR(255) NOT NULL,
            collectionId INTEGER REFERENCES platformCollection(id),
            ownerId INTEGER REFERENCES users(id)
        );
    `;

    await client.query(createCollectionAccountTableQuery);


    console.log("Table Created Successfully!");
    client.end();
}

createTable();
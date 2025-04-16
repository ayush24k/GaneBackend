declare namespace NodeJS {
    interface ProcessEnv {
        JWT_SECRET: string;
        PORT: number;
        DB_LINK_PG: string;
    }
}

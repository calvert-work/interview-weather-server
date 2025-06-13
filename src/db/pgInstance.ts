import "dotenv/config";
import knex from "knex";

export const pgInstance = knex({
	client: "pg",
	connection: process.env.DATABASE_URL
});
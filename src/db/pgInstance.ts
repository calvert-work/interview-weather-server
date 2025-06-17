import "dotenv/config";
import knex from "knex";

export const pgInstance = knex({
	client: "pg",
	connection: {
		connectionString: process.env.DATABASE_URL,
		ssl: { rejectUnauthorized: false },
	}
});

// Function to check if PostgreSQL is connected
export async function checkPgConnection() {
	try {
		await pgInstance.raw("SELECT 1");
		console.log("PostgreSQL connection successful.");
		return true;
	} catch (error) {
		console.error("PostgreSQL connection failed:", error);
		return false;
	}
}

checkPgConnection();

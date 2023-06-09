// Create a connection to the db
require("dotenv").config();
const { Client } = require('pg');
const SCHEMA_PATH = './src/db/schema';
const SEEDS_PATH = './src/db/seeds';

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;
const fs = require("fs").promises;

const connObj = {
	user: DB_USER,
	host: DB_HOST,
	password: DB_PASS,
	port: DB_PORT,
	database: DB_NAME,
}


// To add the tables
const runMigrations = async db => {
	const migrations = await fs.readdir(SCHEMA_PATH);
	for (const migration of migrations) {
		const sql = await fs.readFile(`${SCHEMA_PATH}/${migration}`, 'utf8');
		console.log(`\t Running ${migration}`);
		await db.query(sql);
	}
}

// To add the seeds
const runSeeds = async db => {
	const seeds = await fs.readdir(SEEDS_PATH);
	for (const seed of seeds) {
		const sql = await fs.readFile(`${SEEDS_PATH}/${seed}`, 'utf8');
		console.log(`\t Running ${seed}`);
		await db.query(sql);
	}
}

// To create connection, add tables and seeds
const resetDB = async () => {
  const client = new Client(connObj);
	try {
		console.log("Running DB Reset...");
		console.log("Establishing DB connection: ");
		await client.connect();
		console.log("connection established!\n");

		console.log("-- Running Migrations --\n");
		await runMigrations(client);
		console.log('\n');
		console.log("-- Running Seeds --\n");
		await runSeeds(client);
		console.log('\n');
		console.log("-- COMPLETED --");
		client.end();
	} catch (e) {
		console.log("ERROR OCCURED:\n", e);
		client.end();
	}
}

// Reset the db
resetDB();
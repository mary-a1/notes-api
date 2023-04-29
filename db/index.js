// Database connection when server is started
require("dotenv").config();
const { Client } = require('pg');

const { DB_HOST, DB_USER, DB_PASS, DB_NAME, DB_PORT } = process.env;
const connObj = {
	user: DB_USER,
	host: DB_HOST,
	password: DB_PASS,
	port: DB_PORT,
	database: DB_NAME,
}

const db = new Client(connObj);

db.connect();

module.exports = db;


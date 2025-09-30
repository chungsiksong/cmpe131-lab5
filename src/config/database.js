// database.js (Using the 'sqlite' package)
const sqlite3 = require('sqlite3');
const { open } = require('sqlite'); // Use 'open' from the sqlite package

const DBSOURCE = "../../db.sqlite";

async function setupDatabase() {
    try {
        const db = await open({
            filename: DBSOURCE,
            driver: sqlite3.Database
        });

        console.log('Connected to the SQLite database.');
        // use .exec() for statements that don't return rows
        await db.exec(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            email TEXT UNIQUE
        )`);
        
        return db;
    } catch (err) {
        console.error('Error connecting to the database', err.message);
        throw err;
    }
}

module.exports = setupDatabase();

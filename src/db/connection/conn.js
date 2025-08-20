const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function initDB() {
  try {
    const connection = await mysql.createConnection(process.env.DB_CONN_URL);
    console.log(`Database connection established`);
    const schema = fs.readFileSync(path.join(__dirname, "../schema/schema.sql"), "utf8");
    await connection.query(schema);
    console.log("Schema applied successfully!"); 
    return connection;
  } catch (err) {
    console.error("Error applying schema:", err);
    process.exit(1);
  }
}

module.exports = {initDB}; 
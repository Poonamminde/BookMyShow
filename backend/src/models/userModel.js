const pool = require("../config/db");

const createUserTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS users(
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

const findUserByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );
  return result.rows[0];
};

const createUser = async (name,email,password) => {
  const result = await pool.query(
    "INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING *",
    [name,email,password]
  );
  return result.rows[0];
};

module.exports = {
  createUserTable,
  findUserByEmail,
  createUser
};
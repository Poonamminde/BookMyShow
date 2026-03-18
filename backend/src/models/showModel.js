const pool = require("../config/db");

const createShowTable = async () => {
  const query = `
    CREATE TABLE IF NOT EXISTS shows (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      start_at TIMESTAMP NOT NULL,
      duration INTEGER NOT NULL,
      available_seats INTEGER DEFAULT 40,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await pool.query(query);
};

const createShow = async (name,start_at,duration)=>{

  const result = await pool.query(
    `INSERT INTO shows(name,start_at,duration)
     VALUES($1,$2,$3)
     RETURNING *`,
     [name,start_at,duration]
  );

  return result.rows[0];
};

const getAllShows = async () => {

  const result = await pool.query(
    `SELECT id,
            name,
            start_at,
            duration,
            available_seats,
            created_at
     FROM shows
     ORDER BY start_at ASC`
  );

  return result.rows;

};

const getAvailableShows = async () => {

  const result = await pool.query(
    `SELECT
        id,
        name,
        start_at,
        duration,
        available_seats
     FROM shows
     WHERE start_at > NOW()
     AND available_seats > 0
     ORDER BY start_at ASC`
  );

  return result.rows;

};



module.exports = { createShowTable, createShow, getAllShows, getAvailableShows };
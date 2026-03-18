const pool = require("../config/db");

const createSeatTable = async () => {

  const query = `
  CREATE TABLE IF NOT EXISTS seats(
    id SERIAL PRIMARY KEY,
    show_id INTEGER REFERENCES shows(id) ON DELETE CASCADE,
    seat_number INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'available'
  )
  `;

  await pool.query(query);
};

const createSeatsForShow = async(showId)=>{

  const values = [];

  for(let i=1;i<=40;i++){
    values.push(`(${showId},${i})`);
  }

  const query = `
    INSERT INTO seats(show_id,seat_number)
    VALUES ${values.join(",")}
  `;

  await pool.query(query);
};

const getSeatsByShowId = async (showId) => {

  const result = await pool.query(
    `SELECT
        id,
        seat_number,
        status
     FROM seats
     WHERE show_id = $1
     ORDER BY seat_number ASC`,
    [showId]
  );

  return result.rows;

};

module.exports = { createSeatTable, createSeatsForShow, getSeatsByShowId };
const pool = require("../config/db");

const createBookingTable = async () => {

  const query = `
  CREATE TABLE IF NOT EXISTS bookings(
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    show_id INTEGER REFERENCES shows(id),
    seat_id INTEGER REFERENCES seats(id),
    status VARCHAR(20) DEFAULT 'PENDING',
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  )
  `;

  await pool.query(query);
};

const getUserBookings = async (userId) => {

  const result = await pool.query(
    `SELECT
        b.id AS booking_id,
        s.name AS show_name,
        s.start_at,
        se.seat_number,
        b.booking_time
     FROM bookings b
     JOIN shows s
     ON b.show_id = s.id
     JOIN seats se
     ON b.seat_id = se.id
     WHERE b.user_id = $1
     ORDER BY s.start_at`,
    [userId]
  );

  return result.rows;

};

const createBooking = async (userId, showId, seatIds) => {

  const client = await pool.connect();

  try {

    await client.query("BEGIN");

    const seats = await client.query(
      `SELECT id,status
       FROM seats
       WHERE id = ANY($1)
       AND show_id = $2
       FOR UPDATE`,
      [seatIds, showId]
    );

    if (seats.rows.length !== seatIds.length) {
      throw new Error("Invalid seats selected");
    }

    const alreadyBooked = seats.rows.find(
      seat => seat.status === "booked"
    );

    if (alreadyBooked) {
      throw new Error("One or more seats already booked");
    }

    for (let seatId of seatIds) {

      await client.query(
        `INSERT INTO bookings(user_id,show_id,seat_id)
         VALUES($1,$2,$3)`,
        [userId, showId, seatId]
      );

      await client.query(
        `UPDATE seats
         SET status='booked'
         WHERE id=$1`,
        [seatId]
      );

    }

    await client.query(
      `UPDATE shows
       SET available_seats = available_seats - $1
       WHERE id=$2`,
      [seatIds.length, showId]
    );

    await client.query("COMMIT");

  } catch (error) {

    await client.query("ROLLBACK");
    throw error;

  } finally {

    client.release();

  }

};

module.exports = { createBookingTable, getUserBookings, createBooking };
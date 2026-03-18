import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Card from '../../components/common/Card';

type RawBooking = {
  booking_id: number;
  show_name: string;
  start_at: string;
  seat_number: number;
  booking_time: string;
};

type AggregatedBooking = {
  key: string;
  show_name: string;
  start_at: string;
  seats: number[];
};

const BookedShows: React.FC = () => {
  const [bookings, setBookings] = useState<AggregatedBooking[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await api.get('/bookings', token);
        const rows: RawBooking[] = (data && data.bookings) || [];

        // aggregate by show_name + start_at
        const map = new Map<string, AggregatedBooking>();

        for (const r of rows) {
          const key = `${r.show_name}::${r.start_at}`;
          if (!map.has(key)) {
            map.set(key, { key, show_name: r.show_name, start_at: r.start_at, seats: [r.seat_number] });
          } else {
            map.get(key)!.seats.push(r.seat_number);
          }
        }

        setBookings(Array.from(map.values()));
      } catch (err: any) {
        setError(err.message || 'Failed to load bookings');
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Bookings</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <div className="grid gap-4">
        {bookings.length === 0 && <div className="text-gray-400">No bookings yet.</div>}
        {bookings.map(b => (
          <Card key={b.key}>
            <div className="font-medium">{b.show_name}</div>
            <div className="text-sm text-gray-300">{new Date(b.start_at).toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-2">
  Seats booked: {b.seats?.length}

  <div className="flex gap-2 mt-1">
    {b.seats?.map(seat => (
      <span
        key={seat}
        className="px-2 py-1 bg-indigo-500 text-white rounded text-xs"
      >
        {seat}
      </span>
    ))}
  </div>
</div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BookedShows;

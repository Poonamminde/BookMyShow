import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api';

type Seat = { id: number; seat_number: number; status: string };

const SeatsPage: React.FC = () => {
  const { showId } = useParams();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await api.get(`/shows/${showId}/seats`, token);
        setSeats((data && data.seats) || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load seats');
      }
    };
    if (showId) load();
  }, [showId]);

  const toggle = (id: string) => {
    setSelected(s => (s.includes(id) ? s.filter(x => x !== id) : [...s, id]));
  };

  const book = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!showId) throw new Error('Show ID missing');
      const seatIds = selected.map((s) => Number(s));
      await api.post(`/shows/${showId}/bookings`, { seatIds }, token);
      alert('Booked successfully');
      setSelected([]);
      // reload seats
      const data = await api.get(`/shows/${showId}/seats`, token);
      setSeats((data && data.seats) || []);
    } catch (err: any) {
      setError(err.message || 'Failed to book');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Seats</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}

      <div className="grid grid-cols-4 gap-3 max-w-lg">
        {seats.map(s => (
          <button key={s.id} disabled={s.status === 'booked'} onClick={() => toggle(String(s.id))} className={`p-3 rounded ${s.status === 'booked' ? 'bg-gray-700 text-gray-500' : selected.includes(String(s.id)) ? 'bg-indigo-600' : 'bg-gray-800 border border-gray-700'}`}>
            {s.seat_number}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <button onClick={book} disabled={selected.length === 0} className="px-4 py-2 rounded bg-indigo-600">Book Selected</button>
      </div>
    </div>
  );
};

export default SeatsPage;

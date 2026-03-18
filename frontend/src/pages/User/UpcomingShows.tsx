import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Card from '../../components/common/Card';
import { useNavigate } from 'react-router-dom';

type Show = { id: number; name: string; description?: string; start_at: string };

const UpcomingShows: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await api.get('/shows/available', token);
        setShows((data && data.shows) || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load');
      }
    };
    load();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Upcoming Shows</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <div className="grid gap-4">
        {shows.map(s => (
          <Card key={s.id}>
            <div className="flex justify-between items-center">
              <div>
                <div className="font-medium">{s.name}</div>
                <div className="text-sm text-gray-300">{s.description}</div>
                <div className="text-xs text-gray-400">{new Date(s.start_at).toLocaleString()}</div>
              </div>
              <div>
                <button onClick={() => navigate(`/shows/${s.id}/seats`)} className="px-3 py-1 rounded bg-indigo-600">View Seats</button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UpcomingShows;

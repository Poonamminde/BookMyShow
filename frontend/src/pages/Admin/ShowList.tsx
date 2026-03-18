import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Card from '../../components/common/Card';
import { Link } from 'react-router-dom';

type Show = {
  _id: string;
  name: string;
  duration: number;
  start_at: string;
};

const AdminShowList: React.FC = () => {
  const [shows, setShows] = useState<Show[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const token = localStorage.getItem('token');
        const data = await api.get('/admin/shows', token);
        setShows((data && data.shows) || []);
      } catch (err: any) {
        setError(err.message || 'Failed to load shows');
      }
    };
    load();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Shows</h2>
        <Link to="/admin/shows/create" className="text-sm text-indigo-400">Create show</Link>
      </div>

      {error && <div className="text-red-400 mb-4">{error}</div>}

      <div className="grid gap-4">
        {shows.length === 0 && <div className="text-gray-400">No shows yet.</div>}
        {shows.map(s => (
          <Card key={s._id}>
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-lg">{s.name}</div>
                <div className="text-sm text-gray-300">{s.duration} minutes</div>
                <div className="text-xs text-gray-400 mt-2">{new Date(s.start_at).toLocaleString()}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AdminShowList;

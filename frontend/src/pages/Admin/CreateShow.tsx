import React, { useState } from 'react';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const CreateShow: React.FC = () => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState(0);
  const [start_at, setStartAt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim()) return setError('Name is required');
    if (!start_at) return setError('Date/time is required');
    if (!duration || duration <= 0) return setError('Duration must be greater than 0');

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Not authenticated');
        setLoading(false);
        return;
      }
      await api.post('/admin/shows', { name: name.trim(), start_at, duration }, token);
      navigate('/admin/shows');
    } catch (err: any) {
      // Prefer server-provided message when available
      setError(err.message || 'Failed to create show');
    } finally { setLoading(false); }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Create Show</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3 max-w-lg">
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Duration in minutes" type="number" min={1} value={duration || ''} onChange={e => setDuration(Number(e.target.value || 0))} />
        <label className="block text-sm text-gray-200">Date/Time
          <input type="datetime-local" value={start_at} onChange={e => setStartAt(e.target.value)} className="w-full px-3 py-2 mt-1 rounded bg-gray-800 border border-gray-700 text-gray-100" />
        </label>
        <div>
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create'}</Button>
        </div>
      </form>
    </div>
  );
};

export default CreateShow;

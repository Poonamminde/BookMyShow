import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!name.trim() || !email || !password) return setError('All fields are required');
    try {
      setLoading(true);
      const data = await api.post('/api/auth/register', { name, email, password });
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('role', data.user?.role || 'user');
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (err: any) {
      setError(err.message || 'Register failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Register</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <Input label="Name" value={name} onChange={e => setName(e.target.value)} />
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div>
          <Button type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</Button>
        </div>
      </form>
    </div>
  );
};

export default Register;

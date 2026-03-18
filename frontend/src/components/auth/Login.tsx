import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import { api } from '../../services/api';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) return setError('Email and password are required');
    try {
      setLoading(true);
      const data = await api.post('/api/auth/login', { email, password });
      if (data?.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        if (data.user.email === 'admin@gmail.com') {
          navigate('/admin/shows');
        } else {
          navigate('/shows/upcoming');
        }
      } else {
        setError('Login failed');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally { setLoading(false); }
  };

  return (
    <div className="max-w-md">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>
      {error && <div className="text-red-400 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <Input label="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <Input label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <div>
          <Button type="submit" disabled={loading}>{loading ? 'Signing...' : 'Sign in'}</Button>
        </div>
      </form>
    </div>
  );
};

export default Login;
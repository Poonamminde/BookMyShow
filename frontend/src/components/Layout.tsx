import { Link, useNavigate } from 'react-router-dom';
import React from 'react';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/login');
    };
    const isAdmin = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string).email === 'admin@gmail.com' : false;

    return (
        <div className="min-h-screen bg-gray-900 text-gray-100">
            <header className="bg-gray-800 border-b border-gray-700">
                <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link to="/" className="text-xl font-semibold">BookMyShow</Link>
                        <Link to="/shows/upcoming" className="text-sm text-gray-300 hover:underline">Upcoming</Link>
                        <Link to="/shows/booked" className="text-sm text-gray-300 hover:underline">Booked</Link>
                        {isAdmin && (
                            <>
                                <Link to="/admin/shows" className="text-sm text-gray-300 hover:underline">Admin Shows</Link>
                                <Link to="/admin/shows/create" className="text-sm text-gray-300 hover:underline">Create Show</Link>
                            </>
                        )}
                    </div>

                    <div className="flex items-center gap-3">
                        {localStorage.getItem('token') ? (
                            <button onClick={logout} className="px-3 py-1 rounded bg-red-600 text-white text-sm">Logout</button>
                        ) : (
                            <>
                                <Link to="/login" className="text-sm text-gray-300 hover:underline">Login</Link>
                                <Link to="/register" className="text-sm text-gray-300 hover:underline">Register</Link>
                            </>
                        )}
                    </div>
                </div>
            </header>

            <main className="max-w-5xl mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
};

export default Layout;

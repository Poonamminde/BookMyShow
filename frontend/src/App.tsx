import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

const Login = lazy(() => import('./components/auth/Login'));
const Register = lazy(() => import('./components/auth/Register'));
const AdminShowList = lazy(() => import('./pages/Admin/ShowList'));
const AdminCreateShow = lazy(() => import('./pages/Admin/CreateShow'));
const UpcomingShows = lazy(() => import('./pages/User/UpcomingShows'));
const BookedShows = lazy(() => import('./pages/User/BookedShows'));
const SeatsPage = lazy(() => import('./pages/User/SeatsPage'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<div className="p-4">Loading...</div>}>
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/admin/shows"
            element={
              <ProtectedRoute role="admin">
                <AdminShowList />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/shows/create"
            element={
              <ProtectedRoute role="admin">
                <AdminCreateShow />
              </ProtectedRoute>
            }
          />

          <Route
            path="/shows/upcoming"
            element={
              <ProtectedRoute role="user">
                <UpcomingShows />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shows/booked"
            element={
              <ProtectedRoute role="user">
                <BookedShows />
              </ProtectedRoute>
            }
          />
          <Route
            path="/shows/:showId/seats"
            element={
              <ProtectedRoute role="user">
                <SeatsPage />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;

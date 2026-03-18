# BookMyShow

Lightweight ticket booking demo (React + Vite frontend, Express + Postgres backend).

## Features
- User registration and login (JWT)
- Create shows (admin)
- View upcoming shows, view seats, and book seats (users)
- Simple role gating: admin access is determined by the user's email (admin@gmail.com)

## Prerequisites
- Node.js 16+
- npm or yarn
- PostgreSQL

## Environment
Create `.env` files in `backend/` (copy from `.env.example` if available) with at least:

```
PORT=3000
DATABASE_URL=postgres://user:password@localhost:5432/bookmyshow
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
```

Frontend environment (optional) in `.env` or set Vite vars:

```
VITE_API_BASE=http://localhost:3000/api
```

## Install & Run
Backend
```bash
cd backend
npm install
# start the server (this project uses a simple server entry)
node server.js
```

Frontend
```bash
cd frontend
npm install
npm run dev
```

Open the frontend (default Vite port 5173) and use the app.

## Database / Seeding Admin
The backend uses Postgres. If tables are not created automatically, start the backend and inspect logs or run the SQL in the model files.

To create an initial admin user manually (one-time):

1. Generate a bcrypt password hash:
```bash
node -e "console.log(require('bcrypt').hashSync('YourAdminPasswordHere', 10))"
```
2. In psql, insert the user (replace hashed password):
```sql
INSERT INTO users (name, email, password, role) VALUES ('Admin', 'admin@gmail.com', '<hashed_pw>', 'admin');
```

Note: Current frontend/admin gating expects the admin email to be `admin@gmail.com`. You can change this in `frontend/src/components/ProtectedRoute.tsx` and the backend `adminMiddleware.js` as needed.

## Important Endpoints (overview)
- POST `/api/auth/register` — body: `{ name, email, password }`
- POST `/api/auth/login` — body: `{ email, password }` (returns `token` and `user`)
- GET `/api/shows/available` — list upcoming available shows
- GET `/api/shows/:showId/seats` — seats for a show (auth required)
- POST `/api/shows/:showId/bookings` — book seats (auth required), body: `{ seatIds: [1,2,3] }`
- POST `/api/admin/shows` — create show (admin only), body: `{ name, start_at, duration }`
- GET `/api/bookings` — user's bookings (auth required)

## Notes & Tips
- Authentication: client must send `Authorization: Bearer <token>` header. Login flow should save `token` and `user` in `localStorage` (the code expects `user` JSON for email checks).
- The app transitioned from a Mongo-style model to Postgres; many frontend components were updated to use `id`, `seat_number`, and `start_at` instead of `_id`, `number`, `date`.
- Error handling: backend returns `{ message }` on failures; the frontend surfaces `message` where available.

## Troubleshooting
- "shows.map is not a function" — caused by using the full response object instead of `response.shows`. Updated components now use `data.shows`.
- Booking failures — ensure `POST /api/shows/:showId/bookings` is called with `{ seatIds: [...] }` and a valid JWT.

## Development
- Consider adding migrations (eg. `node-pg-migrate` or `knex`) and seed scripts for safer DB setup.
- Replace the admin-by-email check with a proper `role` column/enum and server-side authorization for production.

## License
MIT (example) — adjust as appropriate.

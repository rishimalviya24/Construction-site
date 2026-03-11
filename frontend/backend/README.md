# Construction Site - Backend API

## Local setup

1. Copy `.env.example` to `.env`
2. Fill in `MONGODB_URI` and `JWT_SECRET`
3. Set `FRONTEND_URL` to your frontend origin
4. Run:

```bash
npm install
npm run dev
```

## Required environment variables

```env
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=change-this-secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
FRONTEND_URL=http://localhost:5173
FRONTEND_URLS=http://localhost:4173
```

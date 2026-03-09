# Construction Site — Backend API

**Live URL:** https://contruction-backend.onrender.com  
**Frontend:** https://construction-frontend-uk47.onrender.com

## Tech Stack
- Node.js + Express
- MongoDB Atlas
- JWT Authentication
- Multer (image uploads)
- Deployed on Render.com

## Local Development
```bash
npm install
cp .env.example .env   # fill in your MongoDB URI
npm run dev
```

## API Endpoints

| Method | Route | Auth | Description |
|--------|-------|------|-------------|
| GET | `/api/projects` | ❌ | Get all published projects |
| GET | `/api/projects/all` | ✅ | Get all projects incl. drafts |
| POST | `/api/projects` | ✅ | Create new project |
| PUT | `/api/projects/:id` | ✅ | Update project |
| DELETE | `/api/projects/:id` | ✅ | Delete project |
| POST | `/api/auth/login` | ❌ | Admin login → JWT token |
| GET | `/api/auth/verify` | ✅ | Verify JWT token |

## Environment Variables (set in Render Dashboard)
```
PORT=5000
MONGODB_URI=mongodb+srv://...
JWT_SECRET=your_secret_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=Admin@123
```

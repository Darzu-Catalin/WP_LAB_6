# Component Styler - Lab 6 & 7 Setup Guide

## Project Structure

```
LAB6/
├── component-styler/       # Frontend React app (Lab 6)
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Landing.jsx
│   │   │   ├── Editor.jsx
│   │   │   └── Configs.jsx  (now uses API)
│   │   ├── components/
│   │   ├── services/
│   │   │   └── configService.jsx  (NEW: API integration)
│   │   ├── styles/
│   │   │   └── globalStyles.jsx
│   │   ├── context/
│   │   ├── hooks/
│   │   └── utils/
│   ├── .env                (REACT_APP_API_URL=http://localhost:5001)
│   └── package.json
│
└── backend/                # Backend API (Lab 7)
    ├── server.js           (Express + JWT + CRUD)
    ├── package.json
    ├── .env                (PORT=5001, JWT_SECRET, JWT_EXPIRATION)
    └── README.md           (API documentation)
```

## Quick Start

### 1. Start Backend API

```bash
cd LAB6/backend
npm install          # Only needed once
npm start
```

**Expected output:**
```
✅ Component Styler API running on http://localhost:5001
📚 Swagger UI available at http://localhost:5001/api-docs
🔐 Get a token: http://localhost:5001/token?role=ADMIN
```

### 2. Start Frontend (in another terminal)

The frontend is already running on http://localhost:3000, but if you need to restart:

```bash
cd LAB6/component-styler
npm install          # Only needed once
npm start
```

**The app will open automatically at** `http://localhost:3000`

---

## API Documentation

### Interactive Swagger UI

Visit: **http://localhost:5001/api-docs**

### Authentication - Get JWT Token

**Endpoint:** `GET /token?role=ADMIN`

**Roles Available:**
- `ADMIN` → Permissions: READ, WRITE, DELETE
- `WRITER` → Permissions: READ, WRITE
- `VISITOR` → Permissions: READ only

**Example:**
```bash
curl "http://localhost:5001/token?role=ADMIN"
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1m",
  "role": "ADMIN",
  "permissions": ["READ", "WRITE", "DELETE"]
}
```

### CRUD Endpoints

All endpoints require the JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

#### Get All Configurations
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:5001/configs?skip=0&limit=10"
```

#### Create Configuration
```bash
curl -X POST http://localhost:5001/configs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Layout",
    "components": [],
    "backgroundColor": "var(--canvas-bg)"
  }'
```

#### Get Single Configuration
```bash
curl -H "Authorization: Bearer $TOKEN" \
  "http://localhost:5001/configs/:id"
```

#### Update Configuration
```bash
curl -X PUT http://localhost:5001/configs/:id \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Name"
  }'
```

#### Delete Configuration
```bash
curl -X DELETE http://localhost:5001/configs/:id \
  -H "Authorization: Bearer $TOKEN"
```

---

## Frontend Integration

### How It Works

The frontend now uses the API service (`src/services/configService.jsx`) instead of localStorage:

1. **Auto Token Generation**: When the app loads, it automatically requests a JWT token with the `ADMIN` role
2. **Token Expiry Handling**: If token expires (1 minute for demo), a new one is automatically requested
3. **CRUD Operations**: All config save/load/delete operations use the API
4. **Graceful Fallback**: Comments in code show the original localStorage logic (can be re-enabled if needed)

### Key Files Modified

- **`src/App.jsx`**: 
  - Now uses `createConfiguration()` from configService
  - localStorage logic is commented out
  - Can be restored if API is unavailable

- **`src/pages/Configs.jsx`**: 
  - Fetches configurations from API on mount
  - Handles loading and error states
  - API calls for delete operations

- **`src/components/EditorToolbar.jsx`**:
  - SavePanel dropdown now loads configs from API
  - Reloads list after saving new config

- **`src/services/configService.jsx`** (NEW):
  - `getToken()` - Get JWT token
  - `getConfigurations()` - Fetch all configs
  - `getConfiguration()` - Get single config
  - `createConfiguration()` - Save new config
  - `updateConfiguration()` - Update existing config
  - `deleteConfiguration()` - Delete config
  - Auto token renewal on expiry

---

## Testing the Integration

### Option 1: Using the UI

1. Open http://localhost:3000
2. Go to **Editor** → Create some components
3. Click **"Configurations"** button → Save with a name
4. Go to **Saved Configurations** page → See your config
5. Load it back → Should work with API data

### Option 2: Using curl

**Get Token:**
```bash
TOKEN=$(curl -s -X POST http://localhost:5001/token \
  -H "Content-Type: application/json" \
  -d '{"role":"ADMIN"}' | jq -r '.token')
```

**Save Configuration:**
```bash
curl -X POST http://localhost:5001/configs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Config",
    "components": [{"id": "1", "type": "button"}]
  }'
```

**List All:**
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5001/configs
```

---

## Environment Variables

### Backend (`.env` in `backend/` folder)

```env
PORT=5001                                           # API port
JWT_SECRET=your-secret-key-change-in-production   # Change in production!
JWT_EXPIRATION=1m                                  # Token expiry (1m for demo)
```

### Frontend (`.env` in `component-styler/` folder)

```env
REACT_APP_API_URL=http://localhost:5001           # Backend API URL
```

---

## Architecture Overview

```
┌─────────────────────────────────────┐
│  React Frontend (localhost:3000)    │
│  ├── Landing Page                   │
│  ├── Editor (Canvas + Palette)      │
│  └── Saved Configs Page             │
└────────────┬────────────────────────┘
             │
             │ HTTP Requests + JWT
             │ (configService.jsx)
             ▼
┌─────────────────────────────────────┐
│  Express Backend API (localhost:5001)│
│  ├── /token          - Get JWT      │
│  ├── /configs        - CRUD         │
│  ├── /configs/:id    - Single item  │
│  ├── /api-docs       - Swagger UI   │
│  └── /health         - Health check │
└─────────────────────────────────────┘
             │
             │ In-Memory Storage
             │ (can be replaced with DB)
             ▼
┌─────────────────────────────────────┐
│  Configuration Storage (RAM)        │
│  [Resets on server restart]         │
└─────────────────────────────────────┘
```

---

## JWT Token Details

### Payload Structure

```json
{
  "role": "ADMIN",
  "permissions": ["READ", "WRITE", "DELETE"],
  "iat": 1234567890,    // Issued at
  "exp": 1234567950     // Expires in 1 minute
}
```

### Token Flow

1. Frontend requests token with role
2. Backend creates JWT with permissions
3. Frontend stores in sessionStorage (expires when browser closes)
4. Frontend includes token in Authorization header for all API calls
5. Backend verifies token signature and checks permissions
6. If token expired, frontend auto-requests new one

---

## Demonstrating Both Systems (Lab 6 + Lab 7)

### To Show Lab 6 (localStorage approach):

The original localStorage logic is commented in the code:
- `src/App.jsx` - lines with `// COMMENTED OUT`
- `src/pages/Configs.jsx` - localStorage fallback code

Simply uncomment these lines to restore localStorage functionality.

### To Show Lab 7 (API approach):

This is the current active system. Just use the app normally:
1. Configurations are saved to the API
2. Data persists across page reloads (until server restarts)
3. JWT tokens control access

---

## Troubleshooting

### Backend won't start on port 5001

Port already in use:
```bash
# macOS/Linux
lsof -i :5001 | grep -v COMMAND | awk '{print $2}' | xargs kill -9

# Or change PORT in backend/.env to a different port
```

### Frontend can't reach API

Check:
1. Backend is running on port 5001
2. `component-styler/.env` has `REACT_APP_API_URL=http://localhost:5001`
3. Browser console for CORS errors
4. Restart React after changing `.env` file

### JWT token expired

Automatic - frontend will request a new one. Check browser console for token renewal logs.

### Data disappears after server restart

Expected behavior - using in-memory storage. To persist:
- Implement MongoDB/PostgreSQL integration
- Add data export/import feature

---

## Production Deployment Notes

### Before deploying:

1. **Change JWT_SECRET** to a strong random string
2. **Set proper CORS origins** in backend
3. **Use HTTPS** for all connections
4. **Add rate limiting** to prevent abuse
5. **Use real database** instead of in-memory storage
6. **Add input validation** on backend
7. **Set appropriate token expiration** (currently 1m for demo)
8. **Implement refresh token** mechanism
9. **Add user authentication** (user signup/login)
10. **Add logging** and monitoring

---

## Support

For API documentation, visit Swagger UI:
**http://localhost:5001/api-docs**

For code issues, check:
- Backend: `LAB6/backend/server.js`
- Frontend: `LAB6/component-styler/src/services/configService.jsx`

# Component Styler Backend API

REST API backend for the Component Styler application built with Express.js and JWT authentication.

## Features

- ✅ JWT-based authentication with role-based access control (RBAC)
- ✅ CRUD operations for component configurations
- ✅ Pagination support for large datasets
- ✅ Swagger UI documentation
- ✅ Role-based permissions (ADMIN, WRITER, VISITOR)
- ✅ Token expiration (1 minute for demo)
- ✅ CORS enabled for frontend integration

## Setup

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Environment Configuration

Create a `.env` file in the `backend` folder (already created with defaults):

```env
PORT=5000
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=1m
```

### 3. Start the Server

```bash
npm start           # Production
npm run dev         # Development with auto-reload (requires nodemon)
```

Server runs on `http://localhost:5000`

## API Documentation

### Swagger UI

Visit `http://localhost:5000/api-docs` to explore the API with Swagger UI.

## Authentication

### Get JWT Token

**POST /token**
```bash
curl -X POST http://localhost:5000/token \
  -H "Content-Type: application/json" \
  -d '{"role": "ADMIN"}'
```

**GET /token**
```bash
curl "http://localhost:5000/token?role=ADMIN"
```

**Roles and Permissions:**
- `ADMIN`: READ, WRITE, DELETE
- `WRITER`: READ, WRITE
- `VISITOR`: READ only

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "expiresIn": "1m",
  "role": "ADMIN",
  "permissions": ["READ", "WRITE", "DELETE"]
}
```

## Endpoints

All endpoints (except `/token`) require a JWT token in the `Authorization` header:

```
Authorization: Bearer <your-jwt-token>
```

### Configurations

#### Get All Configurations
```
GET /configs?skip=0&limit=10
```

**Query Parameters:**
- `skip` (number): Number of items to skip (default: 0)
- `limit` (number): Number of items to return (default: 10)

**Response:**
```json
{
  "data": [ {...}, {...} ],
  "pagination": {
    "total": 5,
    "skip": 0,
    "limit": 10,
    "hasMore": false
  }
}
```

#### Get Single Configuration
```
GET /configs/:id
```

#### Create Configuration
```
POST /configs
```

**Required Permission:** WRITE

**Body:**
```json
{
  "name": "My Layout",
  "components": [
    {
      "id": "comp-1",
      "type": "Button",
      "props": {...}
    }
  ],
  "backgroundColor": "var(--canvas-bg)"
}
```

#### Update Configuration
```
PUT /configs/:id
```

**Required Permission:** WRITE

#### Delete Configuration
```
DELETE /configs/:id
```

**Required Permission:** WRITE

**Response:**
- Status: 204 No Content

### Health Check
```
GET /health
```

## Example Usage

### 1. Get Token
```bash
TOKEN=$(curl -s -X POST http://localhost:5000/token \
  -H "Content-Type: application/json" \
  -d '{"role":"ADMIN"}' | jq -r '.token')
```

### 2. Create Configuration
```bash
curl -X POST http://localhost:5000/configs \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Dashboard Layout",
    "components": []
  }'
```

### 3. Get All Configurations
```bash
curl -H "Authorization: Bearer $TOKEN" \
  http://localhost:5000/configs
```

### 4. Delete Configuration
```bash
curl -X DELETE http://localhost:5000/configs/config-1 \
  -H "Authorization: Bearer $TOKEN"
```

## HTTP Status Codes

- `200`: Success
- `201`: Created
- `204`: No Content (successful deletion)
- `400`: Bad Request
- `401`: Unauthorized (no token)
- `403`: Forbidden (invalid token or insufficient permissions)
- `404`: Not Found
- `500`: Internal Server Error

## Architecture

### In-Memory Storage

Currently uses in-memory storage (data is lost on server restart). For production:
- Consider MongoDB, PostgreSQL, or other databases
- Implement persistent data storage

### JWT Claims

```json
{
  "role": "ADMIN",
  "permissions": ["READ", "WRITE", "DELETE"],
  "iat": 1234567890,
  "exp": 1234567950
}
```

## Security Notes

- ⚠️ Change `JWT_SECRET` in production
- ⚠️ Use HTTPS in production
- ⚠️ Implement rate limiting
- ⚠️ Add input validation/sanitization
- ⚠️ Consider token refresh mechanisms

## Development

### File Structure

```
backend/
├── server.js              # Main server with all routes
├── package.json           # Dependencies
├── .env                   # Environment configuration
└── README.md              # This file
```

## Future Enhancements

- Database integration (MongoDB, PostgreSQL)
- Refresh token mechanism
- Email verification
- User management endpoints
- Advanced pagination (cursor-based)
- Request logging
- Rate limiting
- Input validation library (joi, zod)

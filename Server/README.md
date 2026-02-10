# VCAS Backend Server

This is the backend server for the VCAS project, built with Express.js and MongoDB.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Variables
Make sure your `.env` file in the project root contains:
```
MONGODB_URI=your_mongodb_atlas_connection_string
PORT=5000
NODE_ENV=development
```

### 3. Start the Server
For development:
```bash
npm run server:dev
```

For production:
```bash
npm run server
```

The server will start on `http://localhost:5000`

## API Endpoints

### Contact Form
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions
- `GET /api/contact/:id` - Get specific contact submission
- `DELETE /api/contact/:id` - Delete contact submission

### Job Applications
- `POST /api/resume` - Submit job application (with file upload)
- `GET /api/resume` - Get all resume submissions
- `GET /api/resume/:id` - Get specific resume submission
- `GET /api/resume/:id/download` - Download resume file
- `DELETE /api/resume/:id` - Delete resume submission

### Health Check
- `GET /api/health` - Server health check

## Database Models

### Contact
- name (String, required)
- email (String, required)
- phone (String)
- subject (String, required)
- message (String, required)
- createdAt (Date, auto)

### Resume
- name (String, required)
- email (String, required)
- phone (String, required)
- position (String, required)
- experience (String, required)
- education (String, required)
- skills (Array of String)
- resumeFile (String, base64 encoded)
- coverLetter (String, optional)
- createdAt (Date, auto)

## File Upload
- Resume files are stored as base64 strings in MongoDB
- Supported formats: PDF, DOC, DOCX
- Maximum file size: 10MB

## Running with Frontend
1. Start the backend server: `npm run server`
2. In another terminal, start the frontend: `npm run dev`
3. Access the application at `http://localhost:5173`

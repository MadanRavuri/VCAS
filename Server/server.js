import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure dotenv FIRST before importing anything that uses environment variables
const envPath = path.join(__dirname, '..', '.env');
dotenv.config({ path: envPath });

// Debug: Check if environment variables are loaded
console.log('Environment variables loaded:');
console.log('BREVO_API_KEY exists:', !!process.env.BREVO_API_KEY);
console.log('HR_EMAIL:', process.env.HR_EMAIL);
console.log('MONGODB_URI exists:', !!process.env.MONGODB_URI);
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('Environment path:', envPath);

// Critical: Check for required environment variables
if (!process.env.BREVO_API_KEY) {
  console.error('❌ CRITICAL: BREVO_API_KEY is not set!');
  console.error('Please configure this environment variable in your deployment platform');
}

if (!process.env.HR_EMAIL) {
  console.error('❌ CRITICAL: HR_EMAIL is not set!');
  console.error('Please configure this environment variable in your deployment platform');
}

if (!process.env.MONGODB_URI) {
  console.error('❌ CRITICAL: MONGODB_URI is not set!');
  console.error('Please configure this environment variable in your deployment platform');
}

// Import routes AFTER dotenv is configured
import contactRoutes from './routes/contact.js';
import resumeRoutes from './routes/resume.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/vcas')
.then(() => {
  console.log('✅ Connected to MongoDB Atlas');
})
.catch((error) => {
  console.error('❌ MongoDB connection error:', error);
  process.exit(1);
});

// Routes
app.use('/api/contact', contactRoutes);
app.use('/api/resume', resumeRoutes);

// Global error handler - ensures JSON responses
app.use((err, req, res, next) => {
  console.error('Global error handler:', err);
  
  // Don't send HTML error pages - always send JSON
  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler - ensures JSON responses for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'VCAS Server is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 VCAS Server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
});

// Export the app for Vercel
export default app;

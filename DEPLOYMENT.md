# Vercel Deployment Guide

## 🚀 Deploy VCAS to Vercel

### Prerequisites
- GitHub repository: https://github.com/MadanRavuri/VCAS.git
- Vercel account
- MongoDB Atlas connection string

### Step 1: Connect to Vercel
1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with your GitHub account
3. Click "Add New..." → "Project"
4. Import your GitHub repository: `MadanRavuri/VCAS`

### Step 2: Configure Environment Variables
In Vercel dashboard, add these environment variables:
```
MONGODB_URI=your_mongodb_atlas_connection_string
NODE_ENV=production
```

### Step 3: Deploy
1. Click "Deploy" button
2. Vercel will automatically detect the configuration
3. Wait for deployment to complete

## 📁 Project Structure for Vercel
```
VCAS/
├── api/index.js          # Serverless function entry point
├── dist/                # Built frontend (auto-generated)
├── public/               # Static assets
├── vercel.json          # Vercel configuration
└── package.json         # Dependencies and build scripts
```

## 🔧 Configuration Files

### vercel.json
- Routes API calls to serverless functions
- Serves static frontend files
- Handles both frontend and backend routing

### api/index.js
- Entry point for serverless functions
- Imports and exports the Express server

## 🌐 After Deployment

### Access Your App
- Frontend: `https://your-app.vercel.app`
- API endpoints: `https://your-app.vercel.app/api/*`

### Test the Application
1. **Contact Form**: Test contact submissions
2. **Career Applications**: Test resume uploads
3. **Health Check**: Visit `/api/health`

## 🔄 Auto-Deployments
Every push to `main` branch will automatically:
1. Build the frontend
2. Deploy to Vercel
3. Update the live application

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection**: Ensure `MONGODB_URI` is correct
2. **Build Errors**: Check `npm run build` locally
3. **API 404s**: Verify `vercel.json` routing

### Debug Mode
Add to environment variables:
```
DEBUG=*
NODE_ENV=development
```

## 📊 Monitoring
- Vercel Analytics for performance
- MongoDB Atlas for database metrics
- Vercel Logs for error tracking

## 🎯 Production Checklist
- [ ] MongoDB Atlas IP whitelist (0.0.0.0/0)
- [ ] Environment variables configured
- [ ] Custom domain (optional)
- [ ] SSL certificate (auto-provided)
- [ ] Error monitoring setup

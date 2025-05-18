# PropertyAdda Deployment Guide

This guide explains how to deploy the PropertyAdda website to production environments.

## File Structure

The deployment configuration consists of:

- `deploy.config.js` - Main configuration file
- `backend-deployment/` - Files for deploying the backend
  - `Dockerfile` - Docker container configuration
  - `render.yaml` - Configuration for Render deployment
- `frontend-deployment/` - Files for deploying the frontend
  - `vercel.json` - Configuration for Vercel deployment
- `package.json.prod` - Production-ready package.json with deployment scripts

## Deployment Options

### 1. Backend Deployment (Render)

The backend can be deployed to Render using the configuration in `backend-deployment/render.yaml`. This will:

- Set up a web service running the Node.js backend
- Create a PostgreSQL database
- Configure all necessary environment variables

**Steps to deploy:**
1. Push your code to GitHub
2. Connect your GitHub repository to Render
3. Use the render.yaml configuration file to set up the services
4. Deploy the services

### 2. Frontend Deployment (Vercel)

The frontend can be deployed to Vercel using the configuration in `frontend-deployment/vercel.json`. This will:

- Build the React application
- Set up routing to serve the application
- Configure the connection to the backend API

**Steps to deploy:**
1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Import the project and use the vercel.json configuration
4. Deploy the application

### 3. Custom Deployment Options

You can also deploy the application using:

- AWS (EC2, S3, RDS)
- Google Cloud Platform
- Azure
- Netlify (frontend)
- Heroku (backend)

## Environment Variables

The following environment variables need to be set for production:

- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret for session encryption
- `VITE_API_URL` - URL of the backend API (for frontend)
- `NODE_ENV` - Set to 'production'
- `PORT` - Port for the backend server (default: 5000)

## Database Migration

Before deploying, make sure to run the database migration:

```bash
npm run db:push
```

## Deployment Scripts

The production package.json contains these helpful scripts:

- `npm run build:all` - Build both frontend and backend
- `npm run deploy:frontend` - Deploy frontend to Vercel
- `npm run deploy:backend` - Deploy backend to Render
- `npm run deploy` - Run all deployment steps in sequence

## Monitoring and Scaling

After deployment, monitor the application using:

- Render's built-in logs and metrics (backend)
- Vercel's analytics (frontend)
- Set up alerts for high error rates or performance issues

Scale the application by:
- Upgrading the Render plan for more resources
- Adding more database capacity
- Using a CDN for static assets

## Support

For deployment issues, contact:
- support@propertyadda.com
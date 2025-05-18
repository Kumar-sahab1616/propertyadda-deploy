# PropertyAdda Deployment Guide

This guide provides detailed instructions for deploying the PropertyAdda website to Vercel (frontend) and Render (backend).

## Deployment Files

We've prepared two deployment folders:

1. `vercel-deployment/` - Contains files for deploying the frontend to Vercel
2. `render-deployment/` - Contains files for deploying the backend to Render

## Frontend Deployment (Vercel)

The frontend deployment folder includes:
- `vercel.json` - Configuration for Vercel deployment
- `package.json` - Dependencies and scripts for the frontend
- `.env` - Environment variables template

### Steps to Deploy to Vercel:

1. **Prepare your frontend code**
   - Copy your frontend code (from `client/` directory) to the `vercel-deployment/` folder
   - Make sure to include all necessary files (src, public, etc.)

2. **Push to GitHub**
   - Create a new GitHub repository
   - Push the `vercel-deployment/` folder to this repository

3. **Deploy on Vercel**
   - Go to [Vercel](https://vercel.com)
   - Sign up or log in
   - Click "Import Project"
   - Select the GitHub repository you created
   - Configure the project settings:
     - Framework Preset: Vite
     - Build Command: `npm run build`
     - Output Directory: `dist`
   - Add environment variables from the `.env` file
   - Click "Deploy"

4. **Configure custom domain (optional)**
   - In your Vercel dashboard, go to the project settings
   - Go to "Domains"
   - Add your custom domain (e.g., propertyadda.com)
   - Follow Vercel's instructions to set up DNS records

## Backend Deployment (Render)

The backend deployment folder includes:
- `render.yaml` - Configuration for Render deployment
- `Dockerfile` - Container configuration
- `.env` - Environment variables template
- `health-check.js` - Endpoint for monitoring

### Steps to Deploy to Render:

1. **Prepare your backend code**
   - Copy your backend code (from `server/` directory) to the `render-deployment/` folder
   - Include shared code (from `shared/` directory)
   - Make sure to include all necessary files

2. **Push to GitHub**
   - Create a new GitHub repository
   - Push the `render-deployment/` folder to this repository

3. **Deploy on Render**
   - Go to [Render](https://render.com)
   - Sign up or log in
   - Click "New +"
   - Select "Blueprint"
   - Connect your GitHub repository
   - Render will use the `render.yaml` file to set up the services
   - Review the configuration and click "Apply"

4. **Set up environment variables**
   - After deployment, go to your service dashboard
   - Navigate to the "Environment" tab
   - Add the environment variables from the `.env` file
   - Make sure to set the `DATABASE_URL` to the PostgreSQL database created by Render

5. **Set up custom domain (optional)**
   - In your Render dashboard, go to your web service
   - Go to the "Settings" tab
   - Scroll down to "Custom Domain"
   - Add your custom domain (e.g., api.propertyadda.com)
   - Follow Render's instructions to set up DNS records

## Connecting Frontend and Backend

After deploying both frontend and backend:

1. **Update the API URL**
   - In your Vercel environment variables, set `VITE_API_URL` to your Render API URL
   - Redeploy the frontend if necessary

2. **Configure CORS**
   - Update your backend CORS settings to allow requests from your Vercel domain

## Testing the Deployment

After deployment:

1. **Test the frontend**
   - Visit your Vercel URL
   - Ensure all pages load correctly
   - Test navigation and UI elements

2. **Test the backend**
   - Test API endpoints using a tool like Postman
   - Visit `/api/health` to check if the backend is running

3. **Test the full application**
   - Try creating an account
   - Search for properties
   - Test all major features

## Troubleshooting

- **Frontend deployment issues**
  - Check Vercel build logs
  - Verify environment variables are set correctly
  - Make sure all dependencies are included in package.json

- **Backend deployment issues**
  - Check Render logs
  - Verify database connection string
  - Test API endpoints individually

## Ongoing Maintenance

1. **Monitoring**
   - Set up monitoring for both Vercel and Render deployments
   - Configure alerts for critical errors

2. **Database backups**
   - Enable automatic backups for your PostgreSQL database on Render

3. **Updates**
   - When updating your application, push changes to GitHub
   - Vercel and Render will automatically rebuild and deploy

---

For any questions or issues, contact:
- Email: support@propertyadda.com
- Phone: +91 9045327038
# PropertyAdda Frontend Deployment

This folder contains all the necessary configuration files for deploying the PropertyAdda frontend to Vercel.

## Deployment Files

- `vercel.json` - Configuration for Vercel deployment
- `package.json` - Dependencies and scripts for the frontend
- `.env` - Environment variables template

## How to Deploy

### Prerequisites

1. A [Vercel](https://vercel.com) account
2. Your frontend code ready for deployment

### Steps

1. Copy your frontend code (from `client/` directory) to this folder
2. Push this folder to a GitHub repository
3. Log in to Vercel and import your GitHub repository
4. Follow the deployment instructions in the main `DEPLOYMENT.md` file

## Environment Variables

Make sure to set the following environment variables in your Vercel project:

- `VITE_API_URL` - The URL of your backend API (hosted on Render)

## Custom Domain Setup

After deployment, you can connect your custom domain:

1. Go to your project settings in Vercel
2. Navigate to the "Domains" section
3. Add your domain (e.g., propertyadda.com)
4. Follow Vercel's instructions to set up DNS records

## Support

For deployment issues or questions, contact:
- Email: support@propertyadda.com
- Phone: +91 9045327038
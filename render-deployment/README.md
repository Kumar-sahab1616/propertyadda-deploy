# PropertyAdda Backend Deployment

This folder contains all the necessary configuration files for deploying the PropertyAdda backend to Render.

## Deployment Files

- `render.yaml` - Configuration for Render deployment
- `Dockerfile` - Container configuration
- `.env` - Environment variables template
- `health-check.js` - Endpoint for monitoring

## How to Deploy

### Prerequisites

1. A [Render](https://render.com) account
2. Your backend code ready for deployment

### Steps

1. Copy your backend code (from `server/` directory) to this folder
2. Also include the shared code (from `shared/` directory)
3. Push this folder to a GitHub repository
4. Log in to Render and import your GitHub repository as a Blueprint
5. Follow the deployment instructions in the main `DEPLOYMENT.md` file

## Environment Variables

Make sure to set the following environment variables in your Render project:

- `NODE_ENV` - Set to "production"
- `PORT` - Port for the server (default: 5000)
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Secret key for session encryption

## Database Setup

Render will automatically create a PostgreSQL database when using the `render.yaml` configuration. The database connection string will be available as an environment variable.

## Custom Domain Setup

After deployment, you can connect your custom domain:

1. Go to your web service in Render
2. Navigate to the "Settings" section
3. Find "Custom Domain"
4. Add your domain (e.g., api.propertyadda.com)
5. Follow Render's instructions to set up DNS records

## Support

For deployment issues or questions, contact:
- Email: support@propertyadda.com
- Phone: +91 9045327038
/**
 * PropertyAdda Deployment Configuration
 * 
 * This configuration file is used for deploying the PropertyAdda website
 * to production environments.
 */

module.exports = {
  // Application settings
  app: {
    name: 'PropertyAdda',
    description: 'India\'s #1 Real Estate Property Portal',
    version: '1.0.0',
  },

  // Frontend settings
  frontend: {
    buildCommand: 'npm run build',
    outputDir: 'dist',
    env: {
      VITE_API_URL: process.env.API_URL || 'https://api.propertyadda.com',
      VITE_ASSET_URL: process.env.ASSET_URL || 'https://assets.propertyadda.com',
    },
  },

  // Backend settings
  backend: {
    startCommand: 'npm run start:prod',
    env: {
      NODE_ENV: 'production',
      PORT: process.env.PORT || 5000,
      DATABASE_URL: process.env.DATABASE_URL,
      SESSION_SECRET: process.env.SESSION_SECRET || 'propertyadda-session-secret',
    },
  },

  // Database settings
  database: {
    type: 'postgresql',
    migrations: true,
    ssl: true,
  },

  // Deployment targets
  deploy: {
    production: {
      frontend: {
        url: 'https://propertyadda.com',
        provider: 'vercel',
      },
      backend: {
        url: 'https://api.propertyadda.com',
        provider: 'render',
        region: 'singapore',
        plan: 'standard',
      },
    },
    staging: {
      frontend: {
        url: 'https://staging.propertyadda.com',
        provider: 'vercel',
      },
      backend: {
        url: 'https://api-staging.propertyadda.com',
        provider: 'render',
        region: 'singapore',
        plan: 'free',
      },
    },
  },

  // Static assets configuration
  assets: {
    storage: 'cloudinary',
    folder: 'propertyadda',
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1024 * 1024, // 5MB
  },
};
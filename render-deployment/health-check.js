/**
 * Health Check endpoint for the PropertyAdda backend
 * 
 * This file adds a health check endpoint for the backend service
 * to allow monitoring systems to check if the service is running properly.
 */

const express = require('express');
const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  const healthcheck = {
    uptime: process.uptime(),
    message: 'OK',
    timestamp: Date.now()
  };
  
  try {
    res.send(healthcheck);
  } catch (error) {
    healthcheck.message = error;
    res.status(503).send(healthcheck);
  }
});

module.exports = router;
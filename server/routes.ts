import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertUserSchema, 
  loginUserSchema, 
  insertPropertySchema,
  insertCitySchema,
  insertAgentSchema,
  insertServiceSchema
} from "@shared/schema";
import { z } from "zod";
import multer from "multer";
import path from "path";
import fs from "fs";
import session from "express-session";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

declare module "express-session" {
  interface SessionData {
    user: {
      id: number;
      username: string;
      role: string;
    };
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up session middleware
  app.use(
    session({
      secret: "propertyadda-secret-key",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // set to true if using https
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      },
    })
  );

  // Auth middleware
  const requireAuth = (req: Request, res: Response, next: Function) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Admin middleware
  const requireAdmin = (req: Request, res: Response, next: Function) => {
    if (!req.session.user || req.session.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };

  // User routes
  app.post("/api/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      
      // Check if user already exists
      const existingUser = await storage.getUserByUsername(userData.username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }
      
      const user = await storage.createUser(userData);
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/login", async (req, res) => {
    try {
      const loginData = loginUserSchema.parse(req.body);
      
      const user = await storage.getUserByUsername(loginData.username);
      if (!user || user.password !== loginData.password) {
        return res.status(401).json({ message: "Invalid username or password" });
      }
      
      // Set user in session
      req.session.user = {
        id: user.id,
        username: user.username,
        role: user.role,
      };
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      return res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/logout", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    const user = await storage.getUser(req.session.user.id);
    if (!user) {
      req.session.destroy(() => {});
      return res.status(401).json({ message: "User not found" });
    }
    
    // Remove password from response
    const { password, ...userWithoutPassword } = user;
    
    return res.json(userWithoutPassword);
  });

  // Property routes
  app.get("/api/properties", async (req, res) => {
    const { city, status, search, featured } = req.query;
    
    let properties;
    if (featured === "true") {
      properties = await storage.getFeaturedProperties();
    } else if (city) {
      properties = await storage.getPropertiesByCity(city as string);
    } else if (status) {
      properties = await storage.getPropertiesByStatus(status as string);
    } else if (search) {
      properties = await storage.searchProperties(search as string);
    } else {
      properties = await storage.getAllProperties();
    }
    
    return res.json(properties);
  });

  app.get("/api/properties/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    
    const property = await storage.getProperty(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    return res.json(property);
  });

  app.post("/api/properties", requireAuth, async (req, res) => {
    try {
      const propertyData = insertPropertySchema.parse({
        ...req.body,
        userId: req.session.user!.id,
      });
      
      // Validate images (check if they have phone numbers)
      if (propertyData.images.some(img => containsPhoneNumber(img))) {
        return res.status(400).json({ 
          message: "Please remove phone number or address from the image before uploading." 
        });
      }
      
      const property = await storage.createProperty(propertyData);
      return res.status(201).json(property);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/properties/:id", requireAuth, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      // Check if user owns the property or is admin
      if (property.userId !== req.session.user!.id && req.session.user!.role !== "admin") {
        return res.status(403).json({ message: "Not authorized to update this property" });
      }
      
      const propertyData = insertPropertySchema.partial().parse(req.body);
      
      // Validate images (check if they have phone numbers)
      if (propertyData.images && propertyData.images.some(img => containsPhoneNumber(img))) {
        return res.status(400).json({ 
          message: "Please remove phone number or address from the image before uploading." 
        });
      }
      
      const updatedProperty = await storage.updateProperty(id, propertyData);
      return res.json(updatedProperty);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  app.delete("/api/properties/:id", requireAuth, async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    
    const property = await storage.getProperty(id);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    // Check if user owns the property or is admin
    if (property.userId !== req.session.user!.id && req.session.user!.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to delete this property" });
    }
    
    const success = await storage.deleteProperty(id);
    if (!success) {
      return res.status(500).json({ message: "Failed to delete property" });
    }
    
    return res.json({ message: "Property deleted successfully" });
  });

  // Get user's properties
  app.get("/api/my-properties", requireAuth, async (req, res) => {
    const properties = await storage.getPropertiesByUser(req.session.user!.id);
    return res.json(properties);
  });

  // City routes
  app.get("/api/cities", async (req, res) => {
    const cities = await storage.getAllCities();
    return res.json(cities);
  });

  app.get("/api/cities/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid city ID" });
    }
    
    const city = await storage.getCity(id);
    if (!city) {
      return res.status(404).json({ message: "City not found" });
    }
    
    return res.json(city);
  });

  app.post("/api/cities", requireAdmin, async (req, res) => {
    try {
      const cityData = insertCitySchema.parse(req.body);
      const city = await storage.createCity(cityData);
      return res.status(201).json(city);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Agent routes
  app.get("/api/agents", async (req, res) => {
    const agents = await storage.getAllAgents();
    return res.json(agents);
  });

  app.get("/api/agents/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid agent ID" });
    }
    
    const agent = await storage.getAgent(id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }
    
    return res.json(agent);
  });

  app.post("/api/agents", requireAdmin, async (req, res) => {
    try {
      const agentData = insertAgentSchema.parse(req.body);
      const agent = await storage.createAgent(agentData);
      return res.status(201).json(agent);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  // Service routes
  app.get("/api/services", async (req, res) => {
    const services = await storage.getAllServices();
    return res.json(services);
  });

  app.get("/api/services/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid service ID" });
    }
    
    const service = await storage.getService(id);
    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }
    
    return res.json(service);
  });

  app.post("/api/services", requireAdmin, async (req, res) => {
    try {
      const serviceData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(serviceData);
      return res.status(201).json(service);
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

// Helper function to check if an image URL contains a phone number
function containsPhoneNumber(imageUrl: string): boolean {
  // In a real app, this would use image recognition APIs
  // For this demo, we'll just return false
  return false;
}

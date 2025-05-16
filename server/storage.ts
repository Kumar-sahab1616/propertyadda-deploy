import { 
  users, properties, cities, agents, services,
  type User, type InsertUser, 
  type Property, type InsertProperty,
  type City, type InsertCity,
  type Agent, type InsertAgent,
  type Service, type InsertService
} from "@shared/schema";
import { db } from "./db";
import { eq, like, and, desc, or } from "drizzle-orm";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Property operations
  getAllProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getPropertiesByUser(userId: number): Promise<Property[]>;
  getPropertiesByCity(city: string): Promise<Property[]>;
  getPropertiesByStatus(status: string): Promise<Property[]>;
  getFeaturedProperties(): Promise<Property[]>;
  searchProperties(query: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined>;
  deleteProperty(id: number): Promise<boolean>;
  
  // City operations
  getAllCities(): Promise<City[]>;
  getCity(id: number): Promise<City | undefined>;
  createCity(city: InsertCity): Promise<City>;
  
  // Agent operations
  getAllAgents(): Promise<Agent[]>;
  getAgent(id: number): Promise<Agent | undefined>;
  createAgent(agent: InsertAgent): Promise<Agent>;
  
  // Service operations
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }
  
  // Property operations
  async getAllProperties(): Promise<Property[]> {
    return await db.select().from(properties).orderBy(desc(properties.createdAt));
  }
  
  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property;
  }
  
  async getPropertiesByUser(userId: number): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.userId, userId));
  }
  
  async getPropertiesByCity(city: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.city, city));
  }
  
  async getPropertiesByStatus(status: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.status, status));
  }
  
  async getFeaturedProperties(): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.featured, true));
  }
  
  async searchProperties(query: string): Promise<Property[]> {
    return await db.select().from(properties).where(
      or(
        like(properties.title, `%${query}%`),
        like(properties.description, `%${query}%`),
        like(properties.locality, `%${query}%`),
        like(properties.city, `%${query}%`)
      )
    );
  }
  
  async createProperty(property: InsertProperty): Promise<Property> {
    const [newProperty] = await db.insert(properties).values(property).returning();
    return newProperty;
  }
  
  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const [updatedProperty] = await db
      .update(properties)
      .set(property)
      .where(eq(properties.id, id))
      .returning();
    return updatedProperty;
  }
  
  async deleteProperty(id: number): Promise<boolean> {
    await db.delete(properties).where(eq(properties.id, id));
    return true;
  }
  
  // City operations
  async getAllCities(): Promise<City[]> {
    return await db.select().from(cities);
  }
  
  async getCity(id: number): Promise<City | undefined> {
    const [city] = await db.select().from(cities).where(eq(cities.id, id));
    return city;
  }
  
  async createCity(city: InsertCity): Promise<City> {
    const [newCity] = await db.insert(cities).values(city).returning();
    return newCity;
  }
  
  // Agent operations
  async getAllAgents(): Promise<Agent[]> {
    return await db.select().from(agents);
  }
  
  async getAgent(id: number): Promise<Agent | undefined> {
    const [agent] = await db.select().from(agents).where(eq(agents.id, id));
    return agent;
  }
  
  async createAgent(agent: InsertAgent): Promise<Agent> {
    const [newAgent] = await db.insert(agents).values(agent).returning();
    return newAgent;
  }
  
  // Service operations
  async getAllServices(): Promise<Service[]> {
    return await db.select().from(services);
  }
  
  async getService(id: number): Promise<Service | undefined> {
    const [service] = await db.select().from(services).where(eq(services.id, id));
    return service;
  }
  
  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db.insert(services).values(service).returning();
    return newService;
  }
}

export const storage = new DatabaseStorage();
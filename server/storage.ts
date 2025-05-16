import { 
  users, type User, type InsertUser,
  properties, type Property, type InsertProperty,
  cities, type City, type InsertCity,
  agents, type Agent, type InsertAgent,
  services, type Service, type InsertService,
} from "@shared/schema";

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

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private cities: Map<number, City>;
  private agents: Map<number, Agent>;
  private services: Map<number, Service>;
  
  private userIdCounter: number;
  private propertyIdCounter: number;
  private cityIdCounter: number;
  private agentIdCounter: number;
  private serviceIdCounter: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.cities = new Map();
    this.agents = new Map();
    this.services = new Map();
    
    this.userIdCounter = 1;
    this.propertyIdCounter = 1;
    this.cityIdCounter = 1;
    this.agentIdCounter = 1;
    this.serviceIdCounter = 1;
    
    // Initialize with some default data
    this.initializeData();
  }

  private initializeData() {
    // Add default cities
    const defaultCities = [
      { name: "Delhi", propertiesCount: 6250, image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" },
      { name: "Mumbai", propertiesCount: 8120, image: "https://images.unsplash.com/photo-1562979314-bee7453e911c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" },
      { name: "Bangalore", propertiesCount: 7450, image: "https://pixabay.com/get/g8401af6ed90f636095d3be3d531d1432cebfa7df3a10f946aa1aedaebb8e5333ab2dbf8f6e2d425490ff94d95dbefb37705b658c488df67543afabd25d2dcc12_1280.jpg" },
      { name: "Lucknow", propertiesCount: 4320, image: "https://pixabay.com/get/g364b08ea405461493d98db70ab2c3ba36fc8c5e4b2937dedc7a59cce6c9165608db67d7c3062e528ff494898c0f8b42a3d696e4bafa512cf00cd9613deb78d20_1280.jpg" },
      { name: "Hyderabad", propertiesCount: 5670, image: "https://images.unsplash.com/photo-1606298855672-1c09a3dd3b48?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" },
      { name: "Chennai", propertiesCount: 4890, image: "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" },
      { name: "Kolkata", propertiesCount: 3980, image: "https://images.unsplash.com/photo-1558431382-27e303142255?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" },
      { name: "Auraiya", propertiesCount: 950, image: "https://images.unsplash.com/photo-1499678329028-101435549a4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400" },
    ];
    
    defaultCities.forEach(city => {
      this.createCity(city);
    });
    
    // Add default agents
    const defaultAgents = [
      { name: "Priya Sharma", company: "Lucknow Properties", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", rating: 45, specialization: "Residential" },
      { name: "Rajesh Kumar", company: "Delhi NCR Specialist", image: "https://images.unsplash.com/photo-1556157382-97eda2d62296?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", rating: 40, specialization: "Commercial" },
      { name: "Neha Singh", company: "Premium Properties", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", rating: 50, specialization: "Luxury Homes" },
      { name: "Vikram Patel", company: "Commercial Expert", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150", rating: 47, specialization: "Commercial" },
    ];
    
    defaultAgents.forEach(agent => {
      this.createAgent(agent);
    });
    
    // Add default services
    const defaultServices = [
      { name: "Home Painting", description: "Professional painting services", icon: "paint-roller" },
      { name: "Electrician", description: "Expert electrical services", icon: "bolt" },
      { name: "Interior Design", description: "Transform your space", icon: "couch" },
      { name: "Pest Control", description: "Professional pest management", icon: "tools" },
    ];
    
    defaultServices.forEach(service => {
      this.createService(service);
    });
    
    // Add an admin user
    this.createUser({
      username: "admin",
      password: "admin123",
      email: "admin@propertyadda.com",
      fullName: "Admin User",
      phone: "9876543210",
      role: "admin",
    } as InsertUser);
    
    // Add some sample properties
    const sampleProperties = [
      {
        title: "3 BHK Apartment",
        description: "Beautiful 3 BHK apartment with modern amenities in a prime location.",
        price: 8550000,
        type: "Flat/Apartment",
        status: "For Sale",
        bedrooms: 3,
        bathrooms: 2,
        area: 1650,
        city: "Lucknow",
        locality: "Green Valley",
        address: "Green Valley Apartments, Lucknow",
        features: ["Swimming Pool", "Gym", "Garden", "24x7 Security"],
        images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        userId: 1,
        featured: true,
      },
      {
        title: "4 BHK Villa",
        description: "Luxurious 4 BHK villa with a beautiful garden and modern amenities.",
        price: 45000,
        type: "Villa",
        status: "For Rent",
        bedrooms: 4,
        bathrooms: 3,
        area: 2800,
        city: "Lucknow",
        locality: "Gomti Nagar",
        address: "Gomti Nagar, Lucknow",
        features: ["Swimming Pool", "Garden", "Modular Kitchen", "Power Backup"],
        images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        userId: 1,
        featured: true,
      },
      {
        title: "4 BHK Penthouse",
        description: "Stunning 4 BHK penthouse with panoramic city views.",
        price: 12000000,
        type: "Flat/Apartment",
        status: "For Sale",
        bedrooms: 4,
        bathrooms: 4,
        area: 3200,
        city: "Lucknow",
        locality: "Indira Nagar",
        address: "Indira Nagar, Lucknow",
        features: ["Terrace Garden", "Private Elevator", "Modular Kitchen", "Home Automation"],
        images: ["https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        userId: 1,
        featured: true,
      },
      {
        title: "Residential Plot",
        description: "Prime residential plot in a developing area with good connectivity.",
        price: 4850000,
        type: "Plot/Land",
        status: "For Sale",
        area: 1800,
        city: "Auraiya",
        locality: "Om Nagar",
        address: "Om Nagar, Auraiya, Uttar Pradesh",
        features: ["Corner Plot", "30 ft. Road", "Near School", "Gated Community"],
        images: ["https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        userId: 1,
        featured: true,
      },
      {
        title: "2 BHK Apartment",
        description: "Cozy 2 BHK apartment with all modern amenities.",
        price: 6500000,
        type: "Flat/Apartment",
        status: "For Sale",
        bedrooms: 2,
        bathrooms: 2,
        area: 1200,
        city: "Delhi",
        locality: "Dwarka",
        address: "Dwarka Sector 12, Delhi",
        features: ["Swimming Pool", "Gym", "Children's Play Area", "Club House"],
        images: ["https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        userId: 1,
        featured: true,
      },
      {
        title: "Commercial Shop",
        description: "Prime commercial shop in a busy market area.",
        price: 9800000,
        type: "Shop/Showroom",
        status: "For Sale",
        area: 800,
        city: "Mumbai",
        locality: "Andheri",
        address: "Andheri West, Mumbai",
        features: ["Main Road Facing", "High Footfall", "Parking Space", "24x7 Security"],
        images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"],
        userId: 1,
        featured: true,
      },
    ];
    
    sampleProperties.forEach(property => {
      this.createProperty(property as InsertProperty);
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    for (const user of this.users.values()) {
      if (user.username === username) {
        return user;
      }
    }
    return undefined;
  }

  async createUser(user: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const newUser: User = { id, ...user } as User;
    this.users.set(id, newUser);
    return newUser;
  }

  // Property operations
  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getPropertiesByUser(userId: number): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.userId === userId
    );
  }

  async getPropertiesByCity(city: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.city.toLowerCase() === city.toLowerCase()
    );
  }

  async getPropertiesByStatus(status: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.status === status
    );
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(
      (property) => property.featured
    );
  }

  async searchProperties(query: string): Promise<Property[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.properties.values()).filter(
      (property) =>
        property.title.toLowerCase().includes(lowerQuery) ||
        property.description.toLowerCase().includes(lowerQuery) ||
        property.locality.toLowerCase().includes(lowerQuery) ||
        property.city.toLowerCase().includes(lowerQuery) ||
        property.address.toLowerCase().includes(lowerQuery)
    );
  }

  async createProperty(property: InsertProperty): Promise<Property> {
    const id = this.propertyIdCounter++;
    const timestamp = new Date();
    const newProperty: Property = {
      id,
      ...property,
      createdAt: timestamp,
    } as Property;
    this.properties.set(id, newProperty);
    
    // Update city property count
    const city = Array.from(this.cities.values()).find(c => c.name === property.city);
    if (city) {
      city.propertiesCount++;
      this.cities.set(city.id, city);
    }
    
    return newProperty;
  }

  async updateProperty(id: number, property: Partial<InsertProperty>): Promise<Property | undefined> {
    const existingProperty = this.properties.get(id);
    if (!existingProperty) {
      return undefined;
    }
    
    const updatedProperty: Property = { ...existingProperty, ...property } as Property;
    this.properties.set(id, updatedProperty);
    return updatedProperty;
  }

  async deleteProperty(id: number): Promise<boolean> {
    const property = this.properties.get(id);
    if (!property) {
      return false;
    }
    
    // Update city property count
    const city = Array.from(this.cities.values()).find(c => c.name === property.city);
    if (city) {
      city.propertiesCount--;
      this.cities.set(city.id, city);
    }
    
    return this.properties.delete(id);
  }

  // City operations
  async getAllCities(): Promise<City[]> {
    return Array.from(this.cities.values());
  }

  async getCity(id: number): Promise<City | undefined> {
    return this.cities.get(id);
  }

  async createCity(city: InsertCity): Promise<City> {
    const id = this.cityIdCounter++;
    const newCity: City = { id, ...city } as City;
    this.cities.set(id, newCity);
    return newCity;
  }

  // Agent operations
  async getAllAgents(): Promise<Agent[]> {
    return Array.from(this.agents.values());
  }

  async getAgent(id: number): Promise<Agent | undefined> {
    return this.agents.get(id);
  }

  async createAgent(agent: InsertAgent): Promise<Agent> {
    const id = this.agentIdCounter++;
    const newAgent: Agent = { id, ...agent } as Agent;
    this.agents.set(id, newAgent);
    return newAgent;
  }

  // Service operations
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }

  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }

  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceIdCounter++;
    const newService: Service = { id, ...service } as Service;
    this.services.set(id, newService);
    return newService;
  }
}

export const storage = new MemStorage();

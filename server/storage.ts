import { 
  users, 
  type User, 
  type InsertUser, 
  projects, 
  type Project, 
  type InsertProject,
  messages, 
  type Message, 
  type InsertMessage
} from "@shared/schema";

// modify the interface with any CRUD methods
// you might need
export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Project methods
  getAllProjects(): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project | undefined>;
  deleteProject(id: number): Promise<boolean>;
  
  // Message methods
  createMessage(message: InsertMessage): Promise<Message>;
  getAllMessages(): Promise<Message[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private projectsMap: Map<number, Project>;
  private messagesMap: Map<number, Message>;
  private userCurrentId: number;
  private projectCurrentId: number;
  private messageCurrentId: number;

  constructor() {
    this.users = new Map();
    this.projectsMap = new Map();
    this.messagesMap = new Map();
    this.userCurrentId = 1;
    this.projectCurrentId = 1;
    this.messageCurrentId = 1;
    
    // Initialize with sample projects
    this.initializeProjects();
  }

  // Initialize with sample projects
  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Ares K Solution",
        description: "Professional Business Website",
        category: "website",
        imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
        projectUrl: "https://emmzy1212.github.io/Areskesolution/",
      },
      {
        title: "Iyaj Collection",
        description: "Fashion E-commerce Platform",
        category: "ecommerce",
        imageUrl: "https://images.unsplash.com/photo-1601924994987-69e26d50dc26?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
        projectUrl: "https://emmzy1212.github.io/iyajcollection/",
      },
      {
        title: "Rio Luxury",
        description: "Premium Luxury Brand Website",
        category: "ecommerce",
        imageUrl: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
        projectUrl: "https://rioluxury.vercel.app/",
      },
      {
        title: "Itz Ready Foods",
        description: "Restaurant & Food Delivery Platform",
        category: "ecommerce",
        imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
        projectUrl: "https://emmzy1212.github.io/itzreadyfoods/",
      },
      {
        title: "Jola Essential",
        description: "Essential Products E-commerce",
        category: "ecommerce",
        imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
        projectUrl: "https://emmzy1212.github.io/jolaessential/",
      },
      {
        title: "Artwork Gallery",
        description: "Digital Art Showcase Platform",
        category: "website",
        imageUrl: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80",
        projectUrl: "https://emmzy1212.github.io/artwork/",
      }
    ];

    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Project methods
  async getAllProjects(): Promise<Project[]> {
    return Array.from(this.projectsMap.values());
  }

  async getProject(id: number): Promise<Project | undefined> {
    return this.projectsMap.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = this.projectCurrentId++;
    const project: Project = { ...insertProject, id };
    this.projectsMap.set(id, project);
    return project;
  }

  async updateProject(id: number, projectUpdate: Partial<InsertProject>): Promise<Project | undefined> {
    const existingProject = this.projectsMap.get(id);
    if (!existingProject) {
      return undefined;
    }

    const updatedProject: Project = {
      ...existingProject,
      ...projectUpdate,
    };

    this.projectsMap.set(id, updatedProject);
    return updatedProject;
  }

  async deleteProject(id: number): Promise<boolean> {
    return this.projectsMap.delete(id);
  }

  // Message methods
  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.messageCurrentId++;
    const message: Message = { ...insertMessage, id };
    this.messagesMap.set(id, message);
    return message;
  }

  async getAllMessages(): Promise<Message[]> {
    return Array.from(this.messagesMap.values());
  }
}

export const storage = new MemStorage();

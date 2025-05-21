import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertMessageSchema, messageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
import fetch from "node-fetch";
import { upload } from "./upload";
import { Project } from "./models/projectModel";
import { Message } from "./models/messageModel";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from "mongoose";

// ES Module dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function registerRoutes(app: Express): Promise<Server> {
  // API route prefix
  const apiPrefix = "/api";

  // Get all projects
  app.get(`${apiPrefix}/projects`, async (req: Request, res: Response) => {
    try {
      // Try to fetch from MongoDB first
      let projects = [];
      try {
        projects = await Project.find().sort({ createdAt: -1 });
      } catch (dbError) {
        console.log("MongoDB not available, using memory storage:", dbError);
        // Fallback to memory storage
        projects = await storage.getAllProjects();
      }
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: "Failed to fetch projects" });
    }
  });

  // Get a specific project
  app.get(`${apiPrefix}/projects/:id`, async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      let project;
      
      // Try MongoDB first
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          project = await Project.findById(id);
        } else {
          // Fallback to memory storage if id is not a MongoDB id
          project = await storage.getProject(parseInt(id));
        }
      } catch (dbError) {
        console.log("MongoDB not available, using memory storage:", dbError);
        // Fallback to memory storage
        project = await storage.getProject(parseInt(id));
      }

      if (!project) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(project);
    } catch (error) {
      console.error("Error fetching project:", error);
      res.status(500).json({ message: "Failed to fetch project" });
    }
  });

  // Create a new project with file upload
  app.post(`${apiPrefix}/projects`, upload.single('projectImage'), async (req: Request, res: Response) => {
    try {
      const { title, description, category, projectUrl } = req.body;
      
      // Validate required fields
      if (!title || !description || !category || !projectUrl) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
      let imageUrl = req.body.imageUrl;
      
      // If file was uploaded, use that path
      if (req.file) {
        // Create relative URL path for the image
        imageUrl = `/uploads/${req.file.filename}`;
      }
      
      if (!imageUrl) {
        return res.status(400).json({ message: "Image URL or file is required" });
      }
      
      const projectData = {
        title,
        description,
        category, 
        projectUrl,
        imageUrl
      };
      
      let newProject;
      
      // Try MongoDB first
      try {
        newProject = new Project(projectData);
        await newProject.save();
      } catch (dbError) {
        console.log("MongoDB not available, using memory storage:", dbError);
        // Fallback to memory storage
        newProject = await storage.createProject(projectData);
      }
      
      res.status(201).json(newProject);
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: "Failed to create project" });
    }
  });

  // Update a project
  app.put(`${apiPrefix}/projects/:id`, upload.single('projectImage'), async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      const { title, description, category, projectUrl } = req.body;
      
      let updateData: any = {};
      
      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (category) updateData.category = category;
      if (projectUrl) updateData.projectUrl = projectUrl;
      
      // If file was uploaded, use that path
      if (req.file) {
        updateData.imageUrl = `/uploads/${req.file.filename}`;
      } else if (req.body.imageUrl) {
        updateData.imageUrl = req.body.imageUrl;
      }
      
      let updatedProject;
      
      // Try MongoDB first
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          updatedProject = await Project.findByIdAndUpdate(
            id, 
            updateData, 
            { new: true }
          );
        } else {
          // Fallback to memory storage
          updatedProject = await storage.updateProject(parseInt(id), updateData);
        }
      } catch (dbError) {
        console.log("MongoDB not available, using memory storage:", dbError);
        // Fallback to memory storage
        updatedProject = await storage.updateProject(parseInt(id), updateData);
      }

      if (!updatedProject) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.json(updatedProject);
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: "Failed to update project" });
    }
  });

  // Delete a project
  app.delete(`${apiPrefix}/projects/:id`, async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      let deleteResult = false;
      
      // Try MongoDB first
      try {
        if (mongoose.Types.ObjectId.isValid(id)) {
          const result = await Project.findByIdAndDelete(id);
          deleteResult = !!result;
        } else {
          // Fallback to memory storage
          deleteResult = await storage.deleteProject(parseInt(id));
        }
      } catch (dbError) {
        console.log("MongoDB not available, using memory storage:", dbError);
        // Fallback to memory storage
        deleteResult = await storage.deleteProject(parseInt(id));
      }

      if (!deleteResult) {
        return res.status(404).json({ message: "Project not found" });
      }

      res.status(204).send();
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: "Failed to delete project" });
    }
  });

  // Contact form - Send message to Telegram
  app.post(`${apiPrefix}/contact`, async (req: Request, res: Response) => {
    try {
      // Validate the incoming message
      const validatedData = messageSchema.parse(req.body);
      
      // Get Telegram API key and chat ID from environment variables
      const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN || "";
      const telegramChatId = process.env.TELEGRAM_CHAT_ID || "";
      
      // Format message for Telegram
      const formattedMessage = `
📨 New Contact Message:
👤 Name: ${validatedData.name}
📧 Email: ${validatedData.email}
📝 Subject: ${validatedData.subject}
🔤 Message: ${validatedData.message}
⏰ Time: ${new Date().toLocaleString()}
      `;
      
      // Store the message in MongoDB or memory
      const messageToStore = {
        ...validatedData,
        sentAt: new Date().toISOString(),
      };
      
      try {
        // Try to save to MongoDB first
        const newMessage = new Message(messageToStore);
        await newMessage.save();
        console.log("Message saved to MongoDB");
      } catch (dbError) {
        console.log("MongoDB not available, storing message in memory:", dbError);
        // Fallback to memory storage
        await storage.createMessage(messageToStore);
      }
      
      // Send to Telegram
      if (telegramBotToken && telegramChatId) {
        try {
          const telegramUrl = `https://api.telegram.org/bot${telegramBotToken}/sendMessage`;
          
          const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              chat_id: telegramChatId,
              text: formattedMessage,
            }),
          });
          
          if (!telegramResponse.ok) {
            const errorText = await telegramResponse.text();
            console.error('Failed to send message to Telegram:', errorText);
            // Still return success to user since we stored the message
          } else {
            console.log("Message sent to Telegram successfully");
          }
        } catch (telegramError) {
          console.error("Error sending to Telegram:", telegramError);
          // Still return success to user since we stored the message
        }
      } else {
        console.warn("Telegram credentials not complete. Set TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID to enable Telegram notifications.");
      }
      
      res.status(201).json({ message: "Message sent successfully" });
    } catch (error) {
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        return res.status(400).json({ message: validationError.message });
      }
      console.error('Error processing contact form submission:', error);
      res.status(500).json({ message: "Failed to send message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

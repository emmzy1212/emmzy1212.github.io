// API wrapper for making backend requests
// This file centralizes all API calls so you can easily switch backends later

import { Project, Message, MessageFormData } from "@shared/schema";

// Base URL for API requests - can be changed to point to a different backend
const API_BASE_URL = "/api";

// Project-related API calls
export const projectsApi = {
  // Get all projects
  getAll: async (): Promise<Project[]> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "GET",
      headers: { 'Accept': 'application/json' }
    });
    return response.json();
  },
  
  // Get a single project by ID
  getById: async (id: number): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "GET",
      headers: { 'Accept': 'application/json' }
    });
    return response.json();
  },
  
  // Create a new project
  create: async (formData: FormData): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      body: formData
      // Don't set Content-Type header when sending FormData
      // The browser will automatically set the correct multipart/form-data with boundary
    });
    return response.json();
  },
  
  // Update a project
  update: async (id: number, formData: FormData): Promise<Project> => {
    const response = await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "PUT",
      body: formData
    });
    return response.json();
  },
  
  // Delete a project
  delete: async (id: number): Promise<void> => {
    await fetch(`${API_BASE_URL}/projects/${id}`, {
      method: "DELETE"
    });
  }
};

// Contact form related API calls
export const contactApi = {
  // Send a contact message
  sendMessage: async (message: MessageFormData): Promise<Message> => {
    const response = await fetch(`${API_BASE_URL}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message)
    });
    return response.json();
  }
};

// Export a default object with all APIs for convenience
const api = {
  projects: projectsApi,
  contact: contactApi
};

export default api;
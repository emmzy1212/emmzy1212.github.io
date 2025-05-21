# Personal Portfolio Website

## Overview

This project is a personal portfolio website for a web developer named Afeez. It's built with a modern tech stack consisting of:

- React frontend with TypeScript
- Express backend
- Drizzle ORM for database management
- ShadCN UI component library
- TanStack Query (React Query) for data fetching and state management
- Tailwind CSS for styling
- Wouter for routing

The application showcases Afeez's portfolio of projects, skills, and contact information in a responsive, user-friendly interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack JavaScript architecture with a clear separation between frontend and backend components:

1. **Frontend**: React-based single-page application with client-side routing
2. **Backend**: Express server that serves both the API and the static files
3. **Database**: Drizzle ORM with PostgreSQL (via Neon serverless)
4. **State Management**: TanStack Query for server state, React state for UI
5. **Styling**: Tailwind CSS with ShadCN UI components

This architecture allows for a modern, responsive user experience while maintaining good performance and developer ergonomics. The server handles API requests and serves the frontend as static files in production.

## Key Components

### Frontend

1. **Pages**:
   - Home: Main landing page with hero section, about, skills, portfolio and contact sections
   - AddProject: Admin form for adding new projects to the portfolio
   - NotFound: 404 error page

2. **Components**:
   - UI components: Shadcn/UI library components (button, card, input, etc.)
   - Layout components: Header, Footer
   - Section components: Hero, About, Skills, Portfolio, Contact
   - Form components: ContactForm, AddProjectForm
   - ProjectCard: Display card for portfolio projects

3. **Utilities**:
   - React Query: For data fetching and caching with TanStack Query 
   - Hooks: Custom hooks for toast notifications, mobile detection
   - Utility functions: Type-safe class name merging with clsx/tailwind-merge

### Backend

1. **API Routes**:
   - Projects: CRUD operations for portfolio projects
   - Contact: Form submission endpoint for contact messages

2. **Data Storage**:
   - Schema definitions using Drizzle ORM
   - Database models for users, projects, and messages
   - In-memory storage fallback for development

3. **Server Setup**:
   - Express middleware configuration
   - API route registration
   - Vite development server integration

## Data Flow

1. **Project Listing**:
   - Frontend requests projects via React Query
   - Express backend handles the request at `/api/projects`
   - Server retrieves projects from the database using Drizzle ORM
   - Data is returned as JSON to the client and cached with React Query

2. **Contact Form Submission**:
   - User fills out and submits the contact form
   - Form data is validated with Zod on the client
   - Data is sent to the `/api/contact` endpoint 
   - Server validates data, saves the message to the database
   - Response returns to client with success/error status
   - Toast notification informs user of submission result

3. **Adding Projects**:
   - Admin navigates to the Add Project page
   - Form data is collected and validated with Zod
   - Data is posted to `/api/projects` with authentication
   - Server validates and saves the new project
   - User is redirected back to the portfolio section

## External Dependencies

1. **UI & Design**:
   - Tailwind CSS for styling
   - ShadCN UI for component library
   - Radix UI primitives for accessible components
   - Framer Motion for animations
   - Lucide React for icons

2. **State & Data Management**:
   - TanStack Query for data fetching/caching
   - React Hook Form for form handling
   - Zod for data validation

3. **Database**:
   - Drizzle ORM for database operations
   - Neon Serverless PostgreSQL for database
   - Drizzle-zod for schema validation

4. **Development Tools**:
   - Vite for development server and bundling
   - TypeScript for type safety
   - Drizzle-kit for database schema management

## Deployment Strategy

The application is configured for deployment on Replit with:

1. **Build Process**:
   - Client-side code is built with Vite
   - Server-side code is bundled with esbuild
   - Combined output is placed in the `dist` directory

2. **Runtime**:
   - Node.js 20 for server execution
   - Express server handles both API requests and static files
   - PostgreSQL 16 is used as the database

3. **Environment Variables**:
   - `DATABASE_URL`: Connection string for PostgreSQL database
   - `NODE_ENV`: Environment mode (development/production)

4. **Scaling**:
   - Configured for autoscaling with Replit's deployment target
   - Stateless server design for horizontal scaling capability

## Database Schema

The application defines three main data models:

1. **Users**:
   - `id`: Serial primary key
   - `username`: Unique username
   - `password`: Hashed password

2. **Projects**:
   - `id`: Serial primary key
   - `title`: Project title
   - `description`: Project description
   - `category`: Project category
   - `imageUrl`: URL to project image
   - `projectUrl`: URL to live project

3. **Messages**:
   - `id`: Serial primary key
   - `name`: Sender's name
   - `email`: Sender's email
   - `subject`: Message subject
   - `message`: Message body
   - `sentAt`: Timestamp

These schemas are defined using Drizzle ORM with PostgreSQL typing and have corresponding Zod validation schemas for API operations.
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import contactRoutes from "./routes/contactRoutes.js";
import corsOptions from './corsConfig.js'; // Import the CORS configuration

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use(cors(corsOptions)); // Apply the CORS middleware

app.use("/api", contactRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

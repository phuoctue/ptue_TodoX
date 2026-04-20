import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import cors from "cors";

dotenv.config({ path: "./src/.env" });

const PORT = process.env.PORT || 5001;

const app = express();

//middlewares
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));

// routes
app.use("/api/tasks", taskRoute);

// connect database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bat dau tren cong ${PORT}`);
  });
});

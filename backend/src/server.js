import express from "express";
import dotenv from "dotenv";
import taskRoute from "./routes/taskRouters.js";
import { connectDB } from "./config/db.js";
import cors from "cors";
import path, { dirname } from "path";
dotenv.config({ path: "./src/.env" });

const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

const app = express();

//middlewares
app.use(express.json());

if (process.env.NODE_ENV !== "production") {
  app.use(cors({ origin: "http://localhost:5173" }));
}

// routes
app.use("/api/tasks", taskRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

// connect database
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server bat dau tren cong ${PORT}`);
  });
});

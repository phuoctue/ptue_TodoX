import express from "express";
import {
  getAllTasks,
  postAllTasks,
  updateAllTasks,
  deleteAllTasks,
} from "../controllers/tasksController.js";

const router = express.Router();

router.get("/", getAllTasks);
router.post("/", postAllTasks);
router.put("/:id", updateAllTasks);
router.delete("/:id", deleteAllTasks);

export default router;

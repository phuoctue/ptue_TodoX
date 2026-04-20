import Tasks from "../models/Task.js";

export const getAllTasks = async (req, res) => {
  const { filter = "today" } = req.query;
  const now = new Date();
  let startDate;

  switch (filter) {
    case "today": {
      startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      break;
    }
    case "week": {
      const mondayDate =
        now.getDate() - (now.getDay() - 1) - (now.getDay() === 0 ? 7 : 0);
      startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
      break;
    }
    case "month":
      startDate = new Date(now.getFullYear(), now.getMonth(), 1);
      break;
    case "all":
    default: {
      startDate = null;
    }
  }

  const query = startDate ? { createdAt: { $gte: startDate } } : {};

  try {
    const result = await Tasks.aggregate([
      { $match: query },
      {
        $facet: {
          tasks: [{ $sort: { createdAt: -1 } }],
          activeCount: [{ $match: { status: "active" } }, { $count: "count" }],
          completeCount: [
            { $match: { status: "complete" } },
            { $count: "count" },
          ],
        },
      },
    ]);

    const tasks = result[0].tasks;
    const activeCount = result[0].activeCount[0]?.count || 0;
    const completeCount = result[0].completeCount[0]?.count || 0;

    res.status(200).json({ tasks, activeCount, completeCount });
  } catch (error) {
    console.error("Loi khi goi getAlTasks", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

export const postAllTasks = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ message: "title là bắt buộc" });
    }
    const task = new Tasks({ title: title.trim() });
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error("Loi khi goi createTasks", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

export const updateAllTasks = async (req, res) => {
  try {
    const { title, status, completeAt } = req.body;
    const updatedTask = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        title,
        status,
        completeAt,
      },
      { new: true },
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }
    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Loi khi goi updateTask", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

export const deleteAllTasks = async (req, res) => {
  try {
    const deleteTask = await Tasks.findByIdAndDelete(req.params.id);
    if (!deleteTask) {
      return res.status(404).json({ message: "Nhiem vu khong ton tai" });
    }
    res.status(200).json(deleteTask);
  } catch (error) {
    console.error("Loi khi goi deleteTask", error);
    res.status(500).json({ message: "Loi he thong" });
  }
};

const router = require('express').Router();

const {
  createTask,
  updateTask,
  deleteTask,
  getAllTasks,
  assignTask,
  getTaskByUserId,
  updateTaskStatus,
  getTaskByStatus,
} = require("../controllers/task");

router.post("/createTask", createTask);
router.put("/updateTask/:taskId", updateTask);
router.delete("/deleteTask/:taskId", deleteTask);
router.get("/getAllTasks", getAllTasks);
router.post("/assign/:taskId/:userId", assignTask);
router.get("/user/:userId", getTaskByUserId);
router.put("/status/:taskId", updateTaskStatus);
router.get("/status/", getTaskByStatus);
// router.get("/status/:status", getTaskByStatus);

module.exports = router;

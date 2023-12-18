const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const StatusCode = {
  TODO: 'TODO',
  IN_PROGRESS: 'IN_PROGRESS',
  BLOCKED: 'BLOCKED',
  IN_REVIEW: 'IN_REVIEW',
  DONE: 'DONE'
};

const createTask = async (req, res) => {
    try {
      const { title, description, status } = req.body;
      // const task = await prisma.task.create({
      //   data: { title, description, status: 'TODO '},
      // });
      // res.json(task);
      const statusCode = status || StatusCode.TODO;
      if (!Object.values(StatusCode).includes(status)) {
        return res.status(400).json({ error: 'Invalid status provided' });
      }
      const task = await prisma.task.create({
        data: { title, description, status: statusCode },
      });
  
      res.json(task);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const updateTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { title, description, status } = req.body;
      const updatedTask = await prisma.task.update({
        where: { id: parseInt(taskId) },
        data: { title, description, status },
      });
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const deleteTask = async (req, res) => {
    try {
      const { taskId } = req.params;
      console.log(taskId);
      await prisma.task.delete({ where: { id: parseInt(taskId) } });
      res.json({ message: `Task with id:${id} deleted successfully` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getAllTasks = async (req, res) => {
    try {
      const tasks = await prisma.task.findMany();
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const assignTask = async (req, res) => {
    try {
      
      const { taskId, userId } = req.params;
      const assignedTask = await prisma.taskAssignment.create({
        data: {
          taskId: parseInt(taskId),
          userId: parseInt(userId),
        },
      });

      const task = await prisma.task.findUnique({
        where: { id: parseInt(taskId) },
      });
      const user = await prisma.user.findUnique({
        where: { id: parseInt(userId) },
      });
      //res.json(assignedTask);
      //res.json({message: `Task with id ${taskId} assigned to user with id: ${userId}`}); 
      res.json({message: `Task '${task.title}' assigned to user: ${user.username}`});
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getTaskByUserId = async (req, res) => {
    try {
      const { userId } = req.params;
      const tasks = await prisma.task.findMany({
        where: { assignments: { some: { userId: parseInt(userId) } } },
      });
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const updateTaskStatus = async (req, res) => {
    try {
      const { taskId } = req.params;
      const { status } = req.body;
      const updatedTask = await prisma.task.update({
        where: { id: parseInt(taskId) },
        data: { status },
      });
      res.json(updatedTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const getTaskByStatus = async (req, res) => {
    try {
      const { status } = req.body;
      const tasks = await prisma.task.findMany({
        where: { status },
      });
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {createTask, updateTask, deleteTask, getAllTasks, assignTask, getTaskByUserId, updateTaskStatus, getTaskByStatus}
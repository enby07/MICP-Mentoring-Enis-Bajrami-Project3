const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


const createUser = async (req, res) => {
    try {
      const { username } = req.body;
      const user = await prisma.user.create({
        data: { username },
      });
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  const getUsersTasks = async (req, res) => {
    try {
      const { userId } = req.params;
      const userTasks = await prisma.taskAssignment.findMany({
        where: { userId: parseInt(userId) },
        include: { task: true },
      });
      res.json(userTasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

// const assignTaskToUser = async (req, res) => {
//     try {
//       const { taskId, userId } = req.params;
//       const assignedTask = await prisma.taskAssignment.create({
//         data: {
//           taskId: parseInt(taskId),
//           userId: parseInt(userId),
//         },
//       });
//       res.json(assignedTask);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }


  module.exports = {createUser, getUsersTasks};
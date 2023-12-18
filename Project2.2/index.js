const express = require('express');
const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/user')
const taskRoutes = require('./routes/task')

const app = express();
const port = 3001;
//const prisma = new PrismaClient();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/tasks', taskRoutes);
// app.use('/asign', assignTask);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
  });
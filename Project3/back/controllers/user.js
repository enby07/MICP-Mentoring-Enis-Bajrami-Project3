const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');


const register = async (req, res) => {
  const { username, password, email } = req.body;

  const hashPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashPassword,
        email,
      },
    });

    res.status(201).json({ message: "User registered successfully!\n", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const login = async (req, res) =>{
    const {username, password} = req.body;

    try{
        const user = await prisma.user.findUnique({ where: { username } });

        if(!user){
            return res.status(404).json({error: 'User not found!'});
        }
        const passMatch = await bcrypt.compare(password, user.password);

        if(!passMatch){
            return res.status(401).json({error: 'Invalid Password'});
        }

        res.json({message:"You are logged in!", user})
    }catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error - login back' });
    }
}

 const getAllUsers = async (req, res) => {
   const users = await prisma.user.findMany();
   res.json(users);
 };

 const getUser = async (req, res) => {
    const userId = parseInt(req.params.id);
    const user = await prisma.user.findUnique({ where: { id: userId } });
  
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
  
    res.json(user);
 };
 const getUsername = async (req, res) => {
  const {username} = req.body;
    const user = await prisma.user.findUnique({ 
      where: { username: username } });
  
    if (!user) {
      return res.status(404).json({ error: 'Username not found' });
    }
  
    res.json(user);
 };
 const getUserRole = async (req, res) => {
    const {username} = req.body;
    const user = await prisma.user.findUnique({ where: { username: username }, select:{
      role: true,
    } });
  
    // if (!user) {
    //   return res.json({ error: 'User not found ***BACKEND ERROR***' });
    // }
  
    res.json(user);
 };

 const updateUser = async (req, res) => {
   const userId = parseInt(req.params.id);
   const { username, email, password } = req.body;

   try {
     const updatedUser = await prisma.user.update({
       where: { id: userId },
       data: { username, email, password },
     });

     res.json({ message: "User updated successfully", user: updatedUser });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
   }
 };

 const deleteUser = async (req, res) => {
   const userId = parseInt(req.params.id);
   console.log("This is the user id you deleted: ",userId);
//    const username = req.params;
//    console.log(username);
   try {
     const user = await prisma.user.delete({ where: { id: userId } });
     res.json({ message: "User deleted successfully" });
   } catch (error) {
     console.error(error);
     res.status(500).json({ error: "Internal server error" });
   }
 };

module.exports = {register, login, getAllUsers, getUser, getUserRole, updateUser, deleteUser, getUsername }
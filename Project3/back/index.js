const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors');
//const { PrismaClient } = require('@prisma/client');
const userRoutes = require('./routes/user');
const productRoutes  = require('./routes/product');
const orderRoutes  = require('./routes/order');
const cartRoutes  = require('./routes/cart');


//const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes);

app.use('/products', productRoutes);

app.use('/orders', orderRoutes);

app.use('/cart', cartRoutes);



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
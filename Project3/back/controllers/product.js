const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { name, description, price, stockQuantity} = req.body;

    try {
        const newProduct = await prisma.product.create({
            data:{
                name, description, price, stockQuantity
            }
        })

        res.status(201).json({
            message: 'Product created successfully!', product: newProduct
        })
    } catch (error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });

    }
}
const getAllProducts = async (req, res) => {
    const products = await prisma.product.findMany();
    res.json(products);
  }

const getProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const product =  await prisma.product.findUnique({where: { id: productId}});

    if(!product){
        return res.status(404).json({error: 'Product not found'});
    }

    res.json(product);
}

const updateProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
    const { name, description, price, stockQuantity } = req.body;
  
    try {
      const updatedProduct = await prisma.product.update({
        where: { id: productId },
        data: { name, description, price, stockQuantity },
      });
  
      res.json({ message: 'Product updated successfully', product: updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

const deleteProduct = async (req, res) => {
    const productId = parseInt(req.params.id);
  
    try {
      await prisma.product.delete({ where: { id: productId } });
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = { createProduct, getAllProducts, getProduct, updateProduct, deleteProduct};
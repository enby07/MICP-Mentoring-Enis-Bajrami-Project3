const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const approveOrder = async (req, res) => {
    const orderId = parseInt(req.params.id);
  
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'APPROVED' },
      });
  
      res.json({ message: 'Order approved successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

const denyOrder = async (req, res) => {
    const orderId = parseInt(req.params.id);
  
    try {
      const order = await prisma.order.update({
        where: { id: orderId },
        data: { status: 'DENIED' },
      });
  
      res.json({ message: 'Order denied successfully', order });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

module.exports = {approveOrder, denyOrder}
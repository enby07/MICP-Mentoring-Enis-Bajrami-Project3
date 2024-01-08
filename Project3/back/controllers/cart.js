const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  try {
    const cartItem = await prisma.cart.create({
      data: { userId, productId, quantity },
    });

    res.json({ message: "Item added to cart successfully", cartItem });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const clearCart = async (req, res) => {
  const userId = parseInt(req.params.userId);

  try {
    await prisma.cart.deleteMany({ where: { userId } });
    res.json({ message: "Cart cleared successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { addToCart, clearCart };

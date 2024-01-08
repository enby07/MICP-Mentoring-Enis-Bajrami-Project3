const router = require('express').Router();

const {addToCart, clearCart} = require('../controllers/cart');

router.post('/addToCart/', addToCart);
router.post('/clearCart/:id', clearCart);

module.exports = router;
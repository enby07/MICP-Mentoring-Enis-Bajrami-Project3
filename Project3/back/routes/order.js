const router = require('express').Router();

const {approveOrder, denyOrder} = require('../controllers/order');

router.post('/approveOrder/:id', approveOrder);
router.post('/denyOrder/:id', denyOrder);

module.exports = router;
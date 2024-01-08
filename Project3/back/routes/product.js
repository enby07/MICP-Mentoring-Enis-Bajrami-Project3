
const router = require('express').Router();

const {createProduct, getAllProducts, getProduct, updateProduct, deleteProduct} = require('../controllers/product')

router.post('/createProduct', createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProduct/:id', getProduct);
router.put('/updateProduct/:id', updateProduct);
router.delete('/deleteProduct/:id', deleteProduct);


module.exports = router;
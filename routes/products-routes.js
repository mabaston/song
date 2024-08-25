const express = require('express');
const router = express.Router();

const { getAllProducts, getSingleProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product-controllers');

const { verifyTokenHandler, verifyRoles } = require('../middlewares/jwt-handler'); 

router.get('/', getAllProducts);
router.get('/:id', getSingleProductById);

router.post('/', [verifyTokenHandler, verifyRoles(['admin'])], createProduct);
router.put('/:id', [verifyTokenHandler, verifyRoles(['admin'])], updateProduct);
router.delete('/:id', [verifyTokenHandler, verifyRoles(['admin'])], deleteProduct);

module.exports = router;
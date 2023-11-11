const express = require('express');
const Product = require('../models/productModels');

const {
    getAllProduct,
    getAProduct,
    updateProduct,
    deleteProduct,
    addProduct
    } = require('../controller/productcontroller')

const router = express.Router();



//post the product
router.post('/', addProduct)

//get all the products
router.get('/', getAllProduct)

//get one prodcut
router.get('/:id', getAProduct)

//update a product
router.put('/:id', updateProduct)

//delete product
router.delete('/:id', deleteProduct)


module.exports = router;
const Product = require('../models/productModels');
const asyncHandler = require('express-async-handler')


//get * products
const getAllProduct = asyncHandler(async(req,res)=>{

    try {

        const products = await Product.find({});
        res.status(200).json(products);
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

//get one product
const getAProduct = asyncHandler(async(req, res)=>{

    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
        
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        
    }
})

//update a product
const updateProduct = asyncHandler(async(req,res)=>{
    try {
        const {id} = req.params;
        const product =await Product.findByIdAndUpdate(id, req.body);

        if(!product){
             
            res.status(404)
            throw new Error(`cannot find any product with ID ${id}`)

        }

        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct)
   
    } catch (error) {
        res.status(500)
        throw new Error(error.message);
        
    }
})

//delete a product

const deleteProduct = asyncHandler(async(req, res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
            throw new Error(`cannot find any product with ID ${id}`);
        }
        res.status(200).json(`${product.name} is deleted`);
        
    } catch (error) {
        res.status(500);
        throw new Error(error.message);
    }
})

//create  product

const addProduct = asyncHandler(async(req,res)=>{
    try {

        const product = await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {

        res.status(500)
        throw new Error(error.message);
        
    }
})

module.exports = {
    getAllProduct,
    getAProduct,
    updateProduct,
    deleteProduct,
    addProduct
}
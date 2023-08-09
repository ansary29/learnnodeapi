const Product = require('../models/productsModel')

const asyncHandler = require('express-async-handler')

const getProduct = async(req,res)=>{
    try {
        const product = await Product.find({})
        res.status(200).json(product);
    } catch (error) {
       
        res.status(500).json({message: error.message})
    }
}

const createProduct = async(req,res)=>{
    console.log(req.body);
    // res.send(req.body)
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.send(500).json({message: error.message})
    }
}

const getOneProduct = asyncHandler(async(req,res)=>{
    try {
        const {id } = req.params
        console.log("id",req.params);
        const product = await Product.findById(id)
        res.status(200).json(product);
    } catch (error) {
        res.status(500)
        throw new Error(error.message)
        // res.status(500).json({message: error.message})
    }
})

const updateProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const product  = await Product.findByIdAndUpdate(id, req.body)
        if(!product){
            return res.status(404).json({message:`cannot find any product with  ID ${id}`})
        }
        const updateProduct = await Product.findById(id)
        res.status(200).json(updateProduct);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const deleteProduct = async(req,res)=>{
    try {
        const {id} = req.params
        const product  = await Product.findByIdAndDelete(id)
        if(!product){

            res.status(404).json({message:`cannot find any product with ID ${id}`})
        }
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}


module.exports = {
    getProduct,
    createProduct,
    getOneProduct,
    updateProduct,
    deleteProduct
}
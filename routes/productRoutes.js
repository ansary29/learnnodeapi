const express = require ('express')

const router = express.Router()
// const Product =require("../models/productsModel");
const {getProduct,createProduct,getOneProduct,updateProduct,deleteProduct} = require("../controllers/productController")



//post a data to database
router.post('/',createProduct)


router.get('/',getProduct)

//get one product
router.get('/:id',getOneProduct)

//update 
router.put('/:id',updateProduct)


//delete
router.delete('/:id',deleteProduct)



module.exports = router

// console.log("hello");
require('dotenv').config()
const express = require('express');
const app = express();
const port = 3000;
//connect a database
// const userRoute = require('./routes/userRoutes')
const mongoose = require('mongoose');
const productRouters = require('./routes/productRoutes')
// const ProdSuct = require('./models/productsModel');
const errorMiddleWare = require('./middleware/helloMiddleware')
const MONGO_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 3000
const  cors = require('cors')
//to understand a json req from client we use middleware
app.use(express.json())
app.use(express.urlencoded({encoded:false}))

//use a cors 
//enable to use  anyone 
app.use(cors(corsOptions))
//to  use specified one
const frontend = process.env.frontend
var corsOptions = {
    origin: frontend,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }



app.use('/api/product', productRouters)
// app.use('/api/users', userRouters)

app.get("/",(req,res)=>{
    // throw new Error('file error')
    res.send('hello node api ')
})

app.get("/blog",(req,res)=>{
    res.send('hello ansary')
})


app.use(errorMiddleWare)
//get a data from database
// app.get('/product',async(req,res)=>{
//     try {
//         const product = await Product.find({})
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //get one product
// app.get('/product/:id',async(req,res)=>{
//     try {
//         const {id } = req.params
//         console.log("id",req.params);
//         const product = await Product.findById(id)
//         res.status(200).json(product);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })

// //update 
// app.put('/product/:id',async(req,res)=>{
//     try {
//         const {id} = req.params
//         const product  = await Product.findByIdAndUpdate(id, req.body)
//         if(!product){
//             return res.status(404).json({message:`cannot find any product with  ID ${id}`})
//         }
//         const updateProduct = await Product.findById(id)
//         res.status(200).json(updateProduct);
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })


// //delete
// app.delete('/product/:id',async(req,res)=>{
//     try {
//         const {id} = req.params
//         const product  = await Product.findByIdAndDelete(id)
//         if(!product){

//             res.status(404).json({message:`cannot find any product with ID ${id}`})
//         }
//         res.status(200).json(product)
//     } catch (error) {
//         res.status(500).json({message: error.message})
//     }
// })




// //post a data to database
// app.post('/product',async(req,res)=>{
//     console.log(req.body);
//     // res.send(req.body)
//     try {
//         const product = await Product.create(req.body)
//         res.status(200).json(product);
//     } catch (error) {
//         console.log(error.message);
//         res.send(500).json({message: error.message})
//     }
// })

mongoose.set('strictQuery',false);
mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("Connected to Mongodb");
    app.listen(PORT,()=>{
        console.log(`node api is running on port ${PORT} `);
    });
   
}).catch((error)=>{
    console.log("error");
})

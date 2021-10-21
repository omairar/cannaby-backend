const express = require('express');
const app = express();
const port = process.env.PORT || 3000 ;
const DB = 'mongodb://omairar:omair12345@cluster0-shard-00-00.zz4sr.mongodb.net:27017,cluster0-shard-00-01.zz4sr.mongodb.net:27017,cluster0-shard-00-02.zz4sr.mongodb.net:27017/cannabyAPI?ssl=true&replicaSet=atlas-fsubdw-shard-0&authSource=admin&retryWrites=true&w=majority';


const bodyParser = require('body-parser');
const mongoose = require('mongoose');

require('dotenv/config');
const categoryRouter = require('./routers/category')
const productRouter = require('./routers/product')
const brandRouter = require('./routers/brands')
const outletChainAdminRouter = require('./routers/outletchainadmin')
const outletChainRouter = require('./routers/outletchain')
const inventoryRouter = require('./routers/inventory')

//middlewares

app.use(bodyParser.json());

app.use(`/category`, categoryRouter);
app.use(`/products`, productRouter);
app.use(`/brands`, brandRouter);
app.use(`/oca`, outletChainAdminRouter);
app.use(`/oa`, outletChainRouter);
app.use(`/inventory`, inventoryRouter);

app.get('/',(req,res)=>{
    res.send("first API");
})



mongoose.connect(DB, {
    useNewUrlParser: true, 
  
    useUnifiedTopology: true,
   
})
.then(()=>{
    console.log('database is connedcted')
})
.catch((err)=>{
    console.log(err)
})


app.listen(port, ()=>{
    console.log("server is runnin on port 3000")
})
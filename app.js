const express = require('express');
const app = express();

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



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true, 
  
    useUnifiedTopology: true,
   
})
.then(()=>{
    console.log('database is connedcted')
})
.catch((err)=>{
    console.log(err)
})


app.listen(3000, ()=>{
    console.log("server is runnin on port 3000")
})
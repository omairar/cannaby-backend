const {Product} = require('../models/product')
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');


router.get(`/`, async (req, res) => {
    const productList = await Product.find();

    if(!productList){
        res.send(500).json({success: false})
    }

    res.send(productList);
})


router.get(`/:id`, async(req, res) => {
    //const product = await Product.findById(req.params.id).select('name image -_id');

    const product = await Product.findById(req.params.id).populate('category');

    if(!product){
        res.send(500).json({success: false})
    }

    res.send(product);
})


router.post(`/`, async (req,res) => {


    for(let cate of req.body.category){
        if(!mongoose.isValidObjectId(cate)){
            res.status(400).send('Invalid Product Id')
        };
    }

    

    if(!mongoose.isValidObjectId(req.body.brand)){
        res.status(400).send('Invalid Product Id')
    };



    let product = new Product({
        

        name: req.body.name,
        slug: req.body.slug,
        cbd:req.body.cbd,
        thc: req.body.thc,
        shortDesc: req.body.shortDesc,
        longDesc : req.body.longDesc,
        image : req.body.image,
        imageGallery: req.body.imageGallery,
        brand: req.body.brand,
        category: req.body.category,
        height: req.body.height,
        width: req.body.width,
        weight: req.body.weight,
        status: req.body.status,
        effects: req.body.effects 
    })

    product = await product.save();

    if(!product) 
    return res.status(500).send('The product cannot be created')

    res.send(product);
    
    

})


router.put(`/:id`, async(req,res)=>{

    if(!mongoose.isValidObjectId(req.params.id)){
        res.status(400).send('Invalid Product Id')
    };

    

    try{
        for(let cate of req.body.category){
            if(!mongoose.isValidObjectId(cate)){
                res.status(400).send('Invalid Product Id')
            };
        }
    
        
    
        if(!mongoose.isValidObjectId(req.body.brand)){
            res.status(400).send('Invalid Product Id')
        };

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                slug: req.body.slug,
                cbd:req.body.cbd,
                thc: req.body.thc,
                shortDesc: req.body.shortDesc,
                longDesc : req.body.longDesc,
                image : req.body.image,
                imageGallery: req.body.imageGallery,
                brand: req.body.brand,
                category: req.body.category,
                height: req.body.height,
                width: req.body.width,
                weight: req.body.weight,
                status: req.body.status,
                effects: req.body.effects 
            },
            {new : true }
        )
    
        
    
        if(!product){
            res.status(404).send('the product cannot be created')
        }
        res.send(product);
    
    }catch(err){
        res.status(400).send('Invalid product')
    }


    
})

router.delete(`/:id`,(req,res)=>{
    

    Product.findByIdAndRemove(req.params.id).then(product => {
        if(!product){
            res.status(404).json({success:false, message: 'the product cannot be deleted'})
        }else{
            res.status(200).json({success:true, message: 'the product deleted'})
        }
    }).catch(err => {
        res.status(400).json({success:false, error: err})
    });

})



module.exports=router;
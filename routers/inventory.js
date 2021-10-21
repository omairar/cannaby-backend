const {Inventory} = require('../models/inventory')
const express = require('express');
const router = express.Router();


const mongoose = require('mongoose');

//read all
router.get(`/`,async(req,res)=>{
    const inventoryList = await Inventory.find();

    if(!inventoryList){
        res.send(500).json({success: false})
    }

    //const categoryListNew = createCategories(categoryList)
    res.send(inventoryList)
})

//read one
router.get(`/:id`,async(req,res)=>{
    try{
        const inventory = await Inventory.findById(req.params.id).populate( 'productId').populate('outletId');

    if(!inventory){
        res.send(500).json({success: false})
    }
    res.send(inventory)
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
    
})

//create
router.post(`/`,async(req,res)=>{

    try{

        if(!mongoose.isValidObjectId(req.body.productId)){
            res.status(400).send('Invalid Product Id')
        };

        if(!mongoose.isValidObjectId(req.body.outletId)){
            res.status(400).send('Invalid outlet Id')
        };

        let inventory = new Inventory({
            outletId: req.body.outletId,
            productId: req.body.productId,
            quantity : req.body.quantity,
            discountedPrice: req.body.discountedPrice,
            
            originalPrice: req.body.originalPrice
        })
    
        // category save return 
    
        inventory = await inventory.save();
    
        if(!inventory){
            res.status(404).send('the inventory cannot be created')
        }
        res.send(inventory);
    }catch(err){

    }

    

})

router.put(`/:id`, async(req,res)=>{

    try{

        if(!mongoose.isValidObjectId(req.body.productId)){
            res.status(400).send('Invalid Product Id')
        };

        if(!mongoose.isValidObjectId(req.body.outletId)){
            res.status(400).send('Invalid outlet Id')
        };
    

        const inventory = await Inventory.findByIdAndUpdate(
            req.params.id,
            {
                outletId: req.body.outletId,
                productId: req.body.productId,
                quantity : req.body.quantity,
                discountedPrice: req.body.discountedPrice,
                
                originalPrice: req.body.originalPrice
            },
            {new : true }
        )
    
        
    
        if(!inventory){
            res.status(404).send('the inventory cannot be created')
        }
        res.send(inventory);
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }

    
})

//delete
router.delete(`/:id`,(req,res)=>{
    

    Inventory.findByIdAndRemove(req.params.id).then(inventory => {
        if(!inventory){
            res.status(404).json({success:false, message: 'the inventory cannot be deleted'})
        }else{
            res.status(200).json({success:true, message: 'the inventory deleted'})
        }
    }).catch(err => {
        res.status(400).json({success:false, error: err})
    });
})


module.exports=router;
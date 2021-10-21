const {OutletChain} = require('../models/outletchain')
const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');



//read all
router.get(`/`,async(req,res)=>{
    const ocList = await OutletChain.find().populate('chainAdminId');

    if(!ocList){
        res.send(500).json({success: false})
    }

    //const categoryListNew = createCategories(categoryList)
    res.send(ocList)
})

//read one
router.get(`/:id`,async(req,res)=>{
    try{
        const oc = await OutletChain.findById(req.params.id);

    if(!oc){
        res.send(500).json({success: false})
    }
    res.send(oc)
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
    
})

//create
router.post(`/`,async(req,res)=>{

    if(!mongoose.isValidObjectId(req.body.chainAdminId)){
        res.status(400).send('Invalid chainAdmin Id')
    };


    let oc = new OutletChain({
        outletName: req.body.outletName,
        
        adminName : req.body.adminName,
        adminEmail: req.body.adminEmail,
                
        countryCode: req.body.countryCode,
            
        phone: req.body.phone,
        address: req.body.address,
        city : req.body.city,
        state : req.body.state,
        chainAdminId: req.body.chainAdminId,
        isActive: req.body.isActive
    })

    // category save return 

    oc = await oc.save();

    if(!oc){
        res.status(404).send('the oc cannot be created')
    }
    res.send(oc);

})

router.put(`/:id`, async(req,res)=>{

    try{

        
        const mongoose = require('mongoose');

        const oc = await OutletChain.findByIdAndUpdate(
            req.params.id,
            {
                outletName: req.body.name,
        
                adminName : req.body.adminName,
                adminEmail: req.body.adminEmail,
                        
                countryCode: req.body.countryCode,
                    
                phone: req.body.phone,
                address: req.body.address,
                city : req.body.city,
                state : req.body.state,
                chainAdminId: req.body.chainAdminId,
                isActive: req.body.isActive
            },
            {new : true }
        )
    
        
    
        if(!oc){
            res.status(404).send('the oc cannot be updated')
        }
        res.send(oc);
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }

    
})

//delete
router.delete(`/:id`,(req,res)=>{
    

    OutletChain.findByIdAndRemove(req.params.id).then(oc => {
        if(!oc){
            res.status(404).json({success:false, message: 'the oc cannot be deleted'})
        }else{
            res.status(200).json({success:true, message: 'the oc deleted'})
        }
    }).catch(err => {
        res.status(400).json({success:false, error: err})
    });
})


module.exports=router;
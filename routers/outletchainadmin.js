const {OutletChainAdmin} = require('../models/outletchainadmin')
const express = require('express');
const router = express.Router();




//read all
router.get(`/`,async(req,res)=>{
    const ocaList = await OutletChainAdmin.find();

    if(!ocaList){
        res.send(500).json({success: false})
    }

    //const categoryListNew = createCategories(categoryList)
    res.send(ocaList)
})

//read one
router.get(`/:id`,async(req,res)=>{
    try{
        const oca = await OutletChainAdmin.findById(req.params.id);

    if(!oca){
        res.send(500).json({success: false})
    }
    res.send(oca)
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
    
})

//create
router.post(`/`,async(req,res)=>{
    let oca = new OutletChainAdmin({
        name: req.body.name,
        multipleChains: req.body.multipleChains,
        noOfChains: req.body.noOfChains,
        adminName : req.body.adminName,
        adminEmail: req.body.adminEmail,
                
        countryCode: req.body.countryCode,
            
        phone: req.body.phone,
        address: req.body.address,
        city : req.body.city,
        state : req.body.state,
        renawalDate: req.body.renawalDate,
        isActive: req.body.isActive
    })

    // category save return 

    oca = await oca.save();

    if(!oca){
        res.status(404).send('the oca cannot be created')
    }
    res.send(oca);

})

router.put(`/:id`, async(req,res)=>{

    try{
        const oca = await OutletChainAdmin.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                multipleChains: req.body.multipleChains,
                noOfChains: req.body.noOfChains,
                adminName : req.body.adminName,
                adminEmail: req.body.adminEmail,
                
                countryCode: req.body.countryCode,
            
                phone: req.body.phone,
                address: req.body.address,
                city : req.body.city,
                state : req.body.state,
                renawalDate: req.body.renawalDate,
                isActive: req.body.isActive
            },
            {new : true }
        )
    
        
    
        if(!oca){
            res.status(404).send('the oca cannot be updated')
        }
        res.send(oca);
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }

    
})

//delete
router.delete(`/:id`,(req,res)=>{
    

    OutletChainAdmin.findByIdAndRemove(req.params.id).then(oca => {
        if(!oca){
            res.status(404).json({success:false, message: 'the oca cannot be deleted'})
        }else{
            res.status(200).json({success:true, message: 'the oca deleted'})
        }
    }).catch(err => {
        res.status(400).json({success:false, error: err})
    });
})


module.exports=router;
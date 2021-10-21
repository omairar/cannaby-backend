const {Brands} = require('../models/brands')
const express = require('express');
const router = express.Router();


//read all
router.get(`/`,async(req,res)=>{
    const brandList = await Brands.find();

    if(!brandList){
        res.send(500).json({success: false})
    }
    res.send(brandList)
})

//read one
router.get(`/:id`,async(req,res)=>{

    try {
        const brand = await Brands.findById(req.params.id);

        if(!brand){
            res.send(500).json({success: false})
        }
        res.send(brand)
      } catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
      }

    
})

//create
router.post(`/`,async(req,res)=>{
    let brand = new Brands({
        name: req.body.name,
        image : req.body.image,
        status: req.body.status,
        productCount: req.body.productCount
    })

    // category save return 

    brand = await brand.save();

    if(!brand){
        res.status(404).send('the category cannot be created')
    }
    res.send(brand);

})

router.put(`/:id`, async(req,res)=>{

    try{
        const brand = await Brands.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                image : req.body.image,
                status: req.body.status,
                productCount: req.body.productCount
            },
            {new : true }
        )
    
        
    
        if(!brand){
            res.status(404).send('the category cannot be created')
        }
        res.send(brand);
    }catch(error){
        res.status(400).json({
            error: error
          });
    }
    
})

//delete
router.delete(`/:id`,(req,res)=>{
    

    Brands.findByIdAndRemove(req.params.id).then(brand => {
        if(!brand){
            res.status(404).json({success:false, message: 'the category cannot be deleted'})
        }else{
            res.status(200).json({success:true, message: 'the category deleted'})
        }
    }).catch(err => {
        res.status(400).json({success:false, error: err})
    });
})


module.exports=router;
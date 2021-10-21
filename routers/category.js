const {Category} = require('../models/category')
const express = require('express');
const router = express.Router();


function createCategories(categories, parentCategory = null){

    const categoryList = [];
    let category;
    if(parentCategory == null){
        category = categories.filter(cat => cat.parentCategory == undefined)
        console.log("yo")
    }else{
        category = categories.filter(cat => cat.parentCategory == parentCategory)
        console.log("no")
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children : createCategories(categories , cate._id)
        })
    }

    return categoryList;
}

//read all
router.get(`/`,async(req,res)=>{
    const categoryList = await Category.find();

    if(!categoryList){
        res.send(500).json({success: false})
    }

    //const categoryListNew = createCategories(categoryList)
    res.send(categoryList)
})

//read one
router.get(`/:id`,async(req,res)=>{
    try{
        const category = await Category.findById(req.params.id).populate('parentCategory');

    if(!category){
        res.send(500).json({success: false})
    }
    res.send(category)
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }
    
})

//create
router.post(`/`,async(req,res)=>{
    let category = new Category({
        name: req.body.name,
        slug: req.body.slug,
        parentCategory : req.body.parentCategory,
        image : req.body.image,
        status: req.body.status,
        productCount: req.body.productCount
    })

    // category save return 

    category = await category.save();

    if(!category){
        res.status(404).send('the category cannot be created')
    }
    res.send(category);

})

router.put(`/:id`, async(req,res)=>{

    try{
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                slug: req.body.slug,
                parentCategory : req.body.parentCategory,
                image : req.body.image,
                status: req.body.status,
                productCount: req.body.productCount
            },
            {new : true }
        )
    
        
    
        if(!category){
            res.status(404).send('the category cannot be created')
        }
        res.send(category);
    }
    catch (error) {
        res.status(400).json({
          error: 'Your request could not be processed. Please try again.'
        });
    }

    
})

//delete
router.delete(`/:id`,(req,res)=>{
    

    Category.findByIdAndRemove(req.params.id).then(category => {
        if(!category){
            res.status(404).json({success:false, message: 'the category cannot be deleted'})
        }else{
            res.status(200).json({success:true, message: 'the category deleted'})
        }
    }).catch(err => {
        res.status(400).json({success:false, error: err})
    });
})


module.exports=router;
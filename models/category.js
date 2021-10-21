const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    slug:{
        type: String,
        required:true
    },
    parentCategory: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null,
    },
    image : {
        type: String,
        default:''
    },
    status:{
        type:Boolean,
        default: false
    },
    
    productCount: {
        type: Number,
        default:0
    }

}
,
    { timestamps: true })

//module.exports = mongoose.model('Product', productSchema);

exports.Category = mongoose.model('Category', CategorySchema);
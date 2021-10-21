const mongoose = require('mongoose');

const BrandsSchema = mongoose.Schema({
        name:{
            type: String,
            required: true
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
    { timestamps: true }
)



exports.Brands = mongoose.model('Brands', BrandsSchema);
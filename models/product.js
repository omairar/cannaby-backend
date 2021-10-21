const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        slug:{
            type: String,
        },
        cbd:{
            type: Number,
            required:true
        },
        thc:{
            type: Number,
            required:true
        },
        shortDesc:{
            type: String,
            default:''
        },
        longDesc:{
            type: String,
            default:''
        },
        image : {
            type: String,
            default:''
        },
        imageGallery:[{
            type: String
        }],
        brand:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Brands'
        },
        category:[{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category',
        required: true
        }],
        height:{
            type:Number,
            default:0
        },
        width:{
            type:Number,
            default:0
        },
        weight:{
            type:Number,
            default:0
        },
        status:{
            type:Boolean,
            default: false
        },
        effects: {
            type: String,
            default: 'Calm',
            enum: ['Calm', 'Happy', 'Relaxed', 'Energetic']
        }

    }
    ,
    { timestamps: true }
)

//module.exports = mongoose.model('Product', productSchema);

exports.Product = mongoose.model('Product', ProductSchema);



const mongoose = require('mongoose');

const InventorySchema = mongoose.Schema({
    outletId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'OutletChain',
        default: null,
        required: true
    },
    productId: {
        type:  mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        default: null,
        required: true
    },
    quantity : {
        type: Number,
        default:0,

    },
    discountedPrice:{
        type:Number,
        default: 0
    },
    
    originalPrice: {
        type: Number,
        default:0
    }

}
,
    { timestamps: true })

//module.exports = mongoose.model('Product', productSchema);

exports.Inventory = mongoose.model('Inventory', InventorySchema);
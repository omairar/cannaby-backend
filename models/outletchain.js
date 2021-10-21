const mongoose = require('mongoose');

const OutletChainSchema = mongoose.Schema({
    outletName:{
        type: String,
        required: true
    },
    
    adminName : {
        type: String,
        required: true
    },
    adminEmail:{
        type:String,
        required: true
    },
    
    countryCode: {
        type: Number,
        default:1
    },

    phone: {
        type: Number,
        
    },
    address : {
        
        type:String,
        default:''
    },
    city : {
        
        type:String,
        default:''
    },
    state : {
        type:String,
        default:''
    },
    chainAdminId : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OutletChainAdmin',
        required: true
    },
    isActive:{
        type:Boolean,
        default:false
    }

}
,
    { timestamps: true })

//module.exports = mongoose.model('Product', productSchema);

exports.OutletChain = mongoose.model('OutletChain', OutletChainSchema);
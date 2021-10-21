const mongoose = require('mongoose');

const OutletChainAdminSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    multipleChains:{
        type: Boolean,
        required:true,
        default:false
    },
    noOfChains: {
        type: Number
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
    renawalDate : {
        type: Date
    },
    isActive:{
        type:Boolean,
        default:false
    }

}
,
    { timestamps: true })

//module.exports = mongoose.model('Product', productSchema);

exports.OutletChainAdmin = mongoose.model('OutletChainAdmin', OutletChainAdminSchema);
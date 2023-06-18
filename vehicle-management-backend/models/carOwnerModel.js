const mongoose = require('mongoose');
const Joi = require('joi');

const carOwnerSchema = new mongoose.Schema({
    ownerNames: {type: String, required: true},
    ownerNationalId: {type: Number, required: true},
    ownerPhoneNumber: {type: String, required: true},
    ownerAddress: {type: String, required: true},
    ownerProfile: {
        type: String,
        required: false,
    },
    vehicles: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vehicle'
    }]
},{
    timestamps: true
});

//validate car owner using joi
const carOwnerValidationSchema = Joi.object({
    ownerNames: Joi.string().required(),
    ownerNationalId: Joi.number().required(),
    ownerPhoneNumber: Joi.string().required(),
    ownerAddress: Joi.string().required(),
    ownerProfile: Joi.string().optional(),
    vehicles: Joi.array().items(Joi.string())
});


const CarOwner = mongoose.model('CarOwner', carOwnerSchema);
module.exports ={
    CarOwner,
    carOwnerValidationSchema
}

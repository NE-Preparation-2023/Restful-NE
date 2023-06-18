const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
    chassisNumber: {type: String, required: true},
    manufacturer: {type: String, required: true},
    manufactureYear: {type: Number, required: true},
    price: {type: Number, required: true},
    plateNumber: {type: String, required: false},
    modelName: {type: String, required: true},
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CarOwner'
    },
    assignedAt: {type: Date},
});

module.exports = mongoose.model('Vehicle', vehicleSchema);
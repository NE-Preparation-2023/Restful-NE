const Vehicle = require('../models/vehicleModel');
const {check, validationResult} = require('express-validator');

exports.createVehicle = [
    check('chassisNumber', 'Chassis number is required').exists(),
    check('manufacturer', 'Manufacturer is required').exists(),
    check('manufactureYear', 'Chassis number is required').exists(),
    async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})
        }
        const {chassisNumber, manufacturer, manufactureYear, price, modelName} = req.body;

        const vehicle = new Vehicle({
            chassisNumber,
            manufacturer,
            manufactureYear,
            price,
            modelName
        })

        const savedVehicle = vehicle.save();
        res.status(201).json({
            success: true,
            message: 'Vehicle registered successfully',
            data: savedVehicle
        })
    } catch (error) {
        next(error);
    }
}];

exports.getAllVehicles = async (req, res) => {
    try {
        const vehicles = await Vehicle.find().populate('owner', 'ownerNames');

        res.status(200).json({vehicles});
    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: 'Server error'
        });
    }
};

exports.getVehicleById = async (req, res) => {
    try {
        const vehicle = await Vehicle.findById(req.params.id).populate('owner', 'firstName nationalID');
        if(!vehicle) {
            return res.status(404).json({error: 'Vehicle not found'});
        }

        res.status(200).json({vehicle});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
}

exports.updateVehicle = async (req, res) => {
    try {
        let vehicle = await Vehicle.findById(req.params.id);
        if(!vehicle){
            return res.status(404).json({error: 'Vehicle not found'});
        }

        vehicle = Object.assign(vehicle, req.body);
        await vehicle.save();

        res.status(200).json({vehicle});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'});
    }
};

exports.deleteVehicle = async(req, res) => {
    try {
        const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
        if(!vehicle){
            return res.status(404).json({error: 'Vehicle not found'});
        }

        res.status(200).json({message: 'Vehicle deleted'});
    } catch (error) {
        console.error(error);
        res.status(500).json({error: 'Server error'})
    }
};

exports.getVehiclesOwners = async(req, res, next) => {
    try {
        const vehicles = Vehicle.find().populate('owner', 'firstName lastName');
        res.status(200).json({
            success: true,
            count: (await vehicles).length,
            data: vehicles
        })
    } catch (error) {
        next(error);
    }
}
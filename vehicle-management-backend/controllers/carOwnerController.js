const {CarOwner, carOwnerValidationSchema} = require('../models/carOwnerModel');
const Vehicle = require('../models/vehicleModel');

exports.addCarOwner = async(req, res, next) => {
    try {
        console.log(req.body);
        const {error} = carOwnerValidationSchema.validate(req.body);
        if(error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }
        const { ownerNames, ownerNationalId, ownerPhoneNumber, ownerAddress} = req.body;

        let ownerProfile = '';
        if(req.file){
            ownerProfile = req.file.filename;
        }

        const carOwner = new CarOwner({
            ownerNames,
            ownerNationalId,
            ownerPhoneNumber,
            ownerAddress,
            ownerProfile
        });
        
        const savedCarOwner = await carOwner.save();
        res.status(201).json({
            success: true,
            message: 'Car owner added successfully',
            data: savedCarOwner
        })
    } catch (error) {
        console.log(error);
        next(error);
    }
}

exports.getAllCarOwners = async(req, res, next) => {
    try {
        const carOwners = await CarOwner.find({});
        res.status(200).json({carOwners})
    } catch (error) {
        next(error);
    }
}

exports.getCarOwnerById = async (req, res, next) => {
    try {
        const {id} = req.params;
        const carOwner = await CarOwner.findById(id);

        if(!carOwner){
            return res.status(404).json({
                success: false,
                message: 'Car owner not found'
            })
        }
        res.status(200).json({
            success: true,
            message: 'Car owner retrieved successfully',
            data: carOwner
        })
    } catch (error) {
        next(error);
    }
}

exports.updateCarOwner = async (req, res, next) => {
    try {
        const {id} = req.params;
        const updateCarOwner = await CarOwner.findById(id);
        if(!updateCarOwner){
            return res.status(404).json({
                status: false,
                message: 'Car owner not found'
            })
        }

        if(req.body.ownerNames != null){
            updateCarOwner.ownerNames = req.body.ownerNames;
        }
        if(req.body.ownerNationalId != null){
            updateCarOwner.ownerNationalId = req.body.ownerNationalId;
        }
        if(req.body.ownerPhoneNumber != null){
            updateCarOwner.ownerPhoneNumber = req.body.ownerPhoneNumber;
        }
        if(req.body.ownerAddress != null){
            updateCarOwner.ownerAddress = req.body.phone;
        }
        if(req.body.ownerProfile != null){
            updateCarOwner.ownerProfile = req.body.ownerProfile;
        }
        
        const saveUpdatedCarOwner = await updateCarOwner.save();
        
        return res.status(200).json({
            success: true,
            message: 'Car Owner updated successfully',
            data: saveUpdatedCarOwner
        });
    } catch (error) {
        next(error);
    }
}

exports.deleteCarOwner = async(req, res, next) => {
    try {
        const {id} = req.params;
        const deletedCarOwner = await CarOwner.findByIdAndDelete(id);
        if(!deletedCarOwner){
            return res.status(404).json({
                status: false,
                message: 'Car owner not found'
            })
        }
        return res.status(200).json({
            status: true,
            message: 'Car owner deleted successfully',
            data: deletedCarOwner
        })
    } catch (error) {
        next(error);
    }
}

exports.getAllVehiclesByCarOwnerId = async (req, res, next) => {
    try {
        const owner = await CarOwner.findById(req.params.id).populate('vehicles');
        if(!owner){
            return res.status(404).json({message: 'Car owner not found'});
        }
        res.json(owner.vehicles);
    } catch (error) {
        next(error);
    }
}

//function to generate random car plate number
const generateRandomPlateNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    let plateNumber = '';

    for(let i = 0; i<3; i++) {
        const randomLetterIndex = Math.floor(Math.random() * letters.length);
        plateNumber +=letters[randomLetterIndex];
    }

    for(let i = 0; i<3; i++) {
        const randomNumberIndex = Math.floor(Math.random() * numbers.length);
        plateNumber +=numbers[randomNumberIndex];
    }
    return plateNumber;
}

// assigning a vehicle to a car owner
exports.assignVehicleToCarOwner = async(req, res, next) => {
    try {
        const carOwner = await CarOwner.findById(req.params.carOwnerId);
        
        const vehicle = await Vehicle.findById(req.params.vehicleId).populate('owner', 'firstName nationalID');
        
        if(!carOwner){
            return res.status(404).json({error: 'Car owner not found'});
        }

        if(!vehicle){
            return res.status(404).json({error: 'Vehicle not found'});
        }
        let plateNumber = generateRandomPlateNumber();
        // assign a random plate number to the vehicle
        vehicle.plateNumber = plateNumber;

        //update assignedAt field with current date and time
        vehicle.assignedAt = Date.now();

        //add vehicle to car owner's list of vehicles
        carOwner.vehicles.push(vehicle);
        await carOwner.save();

        //add car owner to vehicle's list of owners
        vehicle.owner = carOwner._id;
        await vehicle.save();

        res.json({message: 'Vehicle assigned to car owner'});
    } catch (error) {
        next(error);
    }
}

exports.deleteVehicleFromCarOwnerVehicleList = async(req, rs, next) => {
    try {
        const owner = await CarOwner.findById(req.params.id);
        const vehicle = await Vehicle(req.params.vehicelId);

        if(!owner) {
            return res.status(404).json({error: 'Car owner not found'});
        }
        if(!vehicle){
            return res.status(404).json({error: 'Vehicle not found'})
        }

        const carOwner = await CarOwner.findByIdAndUpdate(owner._id, {
            $pull: {vehicles: {_id: vehicle._id}},
        }, {new: true})

        res.send(carOwner);
    } catch (error) {
        next(error);
    }
}
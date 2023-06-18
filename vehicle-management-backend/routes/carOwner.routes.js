const express = require('express');
const router = express.Router();
const CarOwnerController = require('../controllers/carOwnerController');
const auth = require('../middlewares/protect');
const upload = require('../middlewares/upload');

router.get('/',  CarOwnerController.getAllCarOwners);
router.post('/', upload.single('ownerProfile') ,CarOwnerController.addCarOwner);
router.get('/:id', CarOwnerController.getCarOwnerById);
router.put('/:id', CarOwnerController.updateCarOwner);
router.delete('/:id', CarOwnerController.deleteCarOwner);
router.get('/:id/vehicles', CarOwnerController.getAllVehiclesByCarOwnerId);
router.put('/:vehicleId/:carOwnerId', CarOwnerController.assignVehicleToCarOwner);
router.delete('/:id/vehicles/:vehicleId',CarOwnerController.deleteVehicleFromCarOwnerVehicleList);
module.exports = router;
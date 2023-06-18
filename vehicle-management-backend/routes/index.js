const express = require ('express');
const router = express.Router();
const { protect , isAdmin}= require('../middlewares/protect')

router.use('/auth/', require('./auth.routes'));
router.use('/vehicle/', protect, isAdmin, require('./vehicle.routes'));
router.use('/carOwner/', protect, isAdmin, require('./carOwner.routes'));
// router.use('/carOwner/', require('./carOwner.routes'));

module.exports = router;

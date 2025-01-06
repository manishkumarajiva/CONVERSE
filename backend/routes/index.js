const { Router } = require('express');
const router = Router();

const userRoutes = require('./api/userRoutes.js');

// ----------------- INDEX ROUTES ------------------- //

router.use('/user', userRoutes);

module.exports = router;

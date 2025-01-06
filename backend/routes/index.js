const { Router } = require('express');
const router = Router();

const userRoutes = require('./api/userRoutes.js');
const chatRoutes = require('./api/chatRoutes.js');

// ----------------- INDEX ROUTES ------------------- //

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);

module.exports = router;

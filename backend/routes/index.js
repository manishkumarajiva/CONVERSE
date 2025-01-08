const { Router } = require('express');
const router = Router();

const userRoutes = require('./api/userRoutes.js');
const chatRoutes = require('./api/chatRoutes.js');
const messageRoutes = require('./api/messageRoutes.js');

// ----------------- INDEX ROUTES ------------------- //

router.use('/user', userRoutes);
router.use('/chat', chatRoutes);
router.use('/message', messageRoutes);

module.exports = router;

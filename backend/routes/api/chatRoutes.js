const { Router } = require('express');
const router = Router();

const { AccessChat } = require('../../controllers/chatController.js');
const protect = require('../../middlewares/protect.js');

// ------------- USER ROUTES --------------- //

router.post('/create', protect, AccessChat);


module.exports = router;
const { Router } = require('express');
const router = Router();

const { SendMessage, AllMessages } = require("../../controllers/messageController.js");
const protect = require('../../middlewares/protect.js');

// --------------- MESSAGE ROUTES ------------ //

router.post('/send', protect, SendMessage);
router.get('/fetchall', protect, AllMessages);


module.exports = router;
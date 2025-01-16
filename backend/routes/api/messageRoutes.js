const { Router } = require('express');
const router = Router();

const { SendMessage, GetAllMessages } = require("../../controllers/messageController.js");
const protect = require('../../middlewares/protect.js');

// --------------- MESSAGE ROUTES ------------ //

router.post('/', protect, SendMessage);
router.get('/', protect, GetAllMessages);


module.exports = router;
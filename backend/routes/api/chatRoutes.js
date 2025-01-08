const { Router } = require('express');
const router = Router();

const { AccessChat, FetchUserChats, CreateGroupChat, RenameGroup, AddToGroup, RemoveFromGroup } = require('../../controllers/chatController.js');
const protect = require('../../middlewares/protect.js');

// ------------- CHAT AND GROUP ROUTES --------------- //

router.post('/create', protect, AccessChat);
router.get('/fetch', protect, FetchUserChats);
router.post('/group', protect, CreateGroupChat);
router.patch('/renamegroup', protect, RenameGroup);
router.put('/addtogroup', protect, AddToGroup);
router.put('/removefromgroup', protect, RemoveFromGroup);

module.exports = router;
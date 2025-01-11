const { Router } = require('express');
const router = Router();
const upload = require('../../middlewares/upload.js');
const { Registeration, Login, GetAllUsers } = require('../../controllers/userController.js');
const protect = require('../../middlewares/protect.js');

// ------------- USER ROUTES --------------- //

router.post('/register',upload.single('avatar'), Registeration);
router.post('/login', Login);
router.get('/GetAll', protect, GetAllUsers);


module.exports = router;
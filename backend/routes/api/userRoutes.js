const { Router } = require('express');
const router = Router();

const { Registeration, Login, GetAllUsers } = require('../../controllers/userController.js');
const protect = require('../../middlewares/protect.js');

// ------------- USER ROUTES --------------- //

router.post('/register', Registeration);
router.post('/login', Login);
router.get('/GetAll', protect, GetAllUsers);


module.exports = router;
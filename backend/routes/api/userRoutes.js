const { Router } = require('express');
const router = Router();


const { Registeration, Login, GetAllUsers } = require('../../controllers/userController.js');

// ------------- USER ROUTES --------------- //

router.post('/register', Registeration);
router.post('/login', Login);
router.get('/GetAll', GetAllUsers);


module.exports = router;
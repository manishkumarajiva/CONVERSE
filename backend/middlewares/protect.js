const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const UserModel = require('../models/userModel.js');


const protect = asyncHandler( async (req, res, next) => {

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        const token = req.headers.authorization.replace('Bearer ','');

        const decode = await jwt.verify(token, process.env.CONVERSE_SECRET_KEY);

        if(decode){
            const user = await UserModel.findById(decode.id);
            req.user.id = user.id;
            next();
        }else{
            throw new Error('Something went wrong DECODE 🅰️');
        }
    }else{
        res.status(400)
        throw new Error('Invalid Headers Authorization 🧑‍🦰');
    }
})
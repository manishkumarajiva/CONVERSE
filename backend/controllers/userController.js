const UserModel = require('../models/userModel.js');
const asyncHandler = require('express-async-handler');
const accessToken = require('../utils/accessToken.js');

//@ Description   New User Registeration
//@ Access        Public

const Registeration = asyncHandler(async (req, res) => {
    const {name, email, password, avatar} = req.body;

    const check = [name, email, password].some((value) => value.trim() === "");
    if(check){
        throw new Error('All Fields are required 🟥')
    }

    const isExist = await UserModel.findOne({ email : email });
    if(isExist){
        res.status(400);
        throw new Error('User Already Registerd 🤒');
    }

    const createResponse = await UserModel.create(req.body);
    if(createResponse){
        res.status(201).json({status : 201, data : createResponse })
    }else{
        res.status(400);
        throw new Error('User Not Created 👎');
    }
});


const Login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body)
    if(!email || !password){
        throw new Error("Invalid Credentials 🔴");
    }

    const user = await UserModel.findOne({ email : email });
    if(!user) throw new Error('Invalid Email or Password 👎');

    if(user && (await user.comparePassword(password))){
        res.status(200).json({status : 200, data : user, auth : await accessToken(user) })
    }else{
        throw new Error("Invalid Credentials 🔴");
    }
});



const GetAllUsers = asyncHandler(async (req, res) => {
    const search = req.query.search;
    const pattern = new RegExp(search)
    
    const users = await UserModel.find({ name : {$regex : pattern, $options : 'i'}});
    if(!users) throw new Error('Empty Users 🤦‍♂️');

    res.status(200).json({status : 200, data : users});
})


module.exports = { Registeration, Login, GetAllUsers }
 
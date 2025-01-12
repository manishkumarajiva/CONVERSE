const UserModel = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");
const accessToken = require("../utils/accessToken.js");

// @ Description   New User Registeration
// @ Access        Public
const Registeration = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const check = [name, email, password].some((value) => value.trim() === "");
  if (check) {
    throw new Error("All Fields are required 🟥");
  }

  const isExist = await UserModel.findOne({ email: email });
  if (isExist) {
    res.status(400);
    throw new Error("User Already Registerd 🤒");
  }

  const createResponse = await UserModel.create({
    name: name,
    email: email,
    password: password,
    avatar: req.file.filename,
  });
  if (createResponse) {
    res.status(201).json({
      status: 201,
      data: createResponse,
      authToken: await accessToken(createResponse),
    });
  } else {
    res.status(400);
    throw new Error("User Not Created 👎");
  }
});

// @ Description    Login User
// @ Access         Public
const Login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new Error("Invalid Credentials 🔴");
  }

  const user = await UserModel.findOne({ email: email });
  if (!user) throw new Error("Invalid Email or Password 👎");

  if (user && (await user.comparePassword(password))) {
    res
      .status(200)
      .json({ status: 200, data: user, authToken: await accessToken(user) });
  } else {
    throw new Error("Invalid Credentials 🔴");
  }
});

// @ Description        Fetch All Users
// @ Access             Private
const GetAllUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const user = await UserModel.find(keyword).find({
    _id: { $ne: req.user },
  }).select("-password");

  if (!user) throw new Error("Empty Users 🤦‍♂️");

  res.status(200).json({ status: 200, data: user });
});

module.exports = { Registeration, Login, GetAllUsers };

const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel.js");
const ChatModel = require("../models/chatModel.js");

// @ Description    Create New Chat & Fetch One to One Chat
// @ Access         Private

const AccessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) throw new Error("User ID not found 👎");

  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name avatar email",
  });

  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user, userId],
    };

    //  Now Create Chat

    try {
      const createChat = await ChatModel.create(chatData);
      const FullChat = await ChatModel.findOne({
        _id: createChat._id,
      }).populate("users", "-password");
      res.status(200).json(FullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

// @ Description    Fetch all chats for loggedin user
// @ Access         Private

const FetchUserChats = asyncHandler(async (req, res) => {
  try {
    const userChats = ChatModel.find({
      users: { $elemMatch: { $eq: req.user } },
    })
      .populate("users", "-passwords")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (result) => {
        result = await UserModel.populate(SpeechRecognitionResultList, {
          path: "latestMessage,sender",
          select: "name avatar email",
        });
        res.status(200).json({ status: 200, data: result });
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @ Description    Create New Group
// @ Access         Private

const CreateGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res
      .status(200)
      .json({ status: 400, message: "All Fields Required 📄" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(200)
      .json({ status: 400, message: "Minimum 2 users required" });
  }

  users.push(req.user);

  try {
    const GroupChat = await ChatModel.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });

    const FullGroupChat = await ChatModel.findOne({ _id: GroupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");

    res.status(200).json({ status: 200, data: FullGroupChat });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @ Description    Rename Group
// @ Access         Private - Admin
// @ chatId --> groupId
// @ chatName --> groupName
const RenameGroup = asyncHandler(async (req, res) => {
  const { chatId, chatName } = req.body;

  const UpdateChat = await ChatModel.findByIdAndUpdate(
    { _id: chatId },
    { chatName: chatName },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!UpdateChat) {
    res.status(400);
    throw new Error("Chat Not Found");
  } else {
    res.status(200).json({ status: 200, data: UpdateChat });
  }
});

// @ Description    Add User to Group
// @ Access         Private - Admin

const AddToGroup = asyncHandler(async (req, res) => {
  const { chatId, userId } = req.body;

  // check if requester is Admin ?

  const added = await ChatModel.findByIdAndUpdate(
    { _id: chatId },
    { $push: { users: userId } },
    { new: true }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

    if(!added){
        res.status(400);
        throw new Error("Chat Not Found")
    }else{
        res.status(201).json({ status : 201, data : added });
    }
});


// @ Description    Remove User to Group
// @ Access         Private - Admin

const RemoveFromGroup = asyncHandler(async (req, res) => {
    const { chatId, userId } = req.body;
  
    // check if requester is Admin ?
  
    const removed = await ChatModel.findByIdAndUpdate(
      { _id: chatId },
      { $pull: { users: userId } },
      { new: true }
    )
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
  
      if(!removed){
          res.status(400);
          throw new Error("Chat Not Found")
      }else{
          res.status(201).json({ status : 201, data : removed });
      }
  });

module.exports = { AccessChat, FetchUserChats, CreateGroupChat, RenameGroup, AddToGroup };

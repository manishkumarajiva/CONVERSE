const asyncHandler = require("express-async-handler");
const UserModel = require("../models/userModel.js");
const ChatModel = require("../models/chatMode.js");

// @ Description    Create New Chat & Fetch One to One Chat
// @ Access         Private

const AccessChat = asyncHandler(async (req, res) => {

  const { userId } = req.body;
  if (!userId) throw new Error("User ID not found 👎");

  var isChat = await ChatModel.find({
    isGroupChat: false,
    $and: [
      { users: { $elementMatch: { $eq: req.user.id } } },
      { users: { $elementMatch: { $eq: userId } } },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");

  isChat = await UserModel.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });


  if(isChat.length > 0){
    res.send(isChat[0])
  }else{
    var chatData = {
        chatName : "sender",
        isGroupChat : false,
        users : [req.user.id, userId]
    }

    //  Now Create Chat

    try {
        const createChat = await ChatModel.create(chatData);
        const FullChat = await ChatModel.findOne({_id: createChat._id}).populate("users","-password");
        res.status(200).json(FullChat);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
  }

});

const asyncHandler = require("express-async-handler");
const MessageModel = require("../models/messageModel.js");
const ChatModel = require("../models/messageModel.js");
const UserModel = require("../models/userModel.js");

// @ Description    Create New Message
// @ Access         Private

const SendMessage = asyncHandler(async (req, res) => {
  const { chatId, content } = req.body;

  if (!chatId || !content) {
    return res.send(400);
  }

  var newMessage = {
    sender: req.user._id,
    chat: chatId,
    content: content,
  };

  try {
    var message = await MessageModel.create(newMessage);

    message = await message.populate("sender", "name avatar").execPopulate();
    message = await message.populate("chat").execPopulate();
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });

    message = await message.populate("sender", "name avatar");
    message = await message.populate("chat");
    message = await UserModel.populate(message, {
      path: "chat.users",
      select: "name avatar email",
    });

    await ChatModel.findByIdAndUpdate(chatId, { latestMessage: message });
    res.status(201).json({ status: 201, data: message });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

// @ Description    Get All Message
// @ Access         Private

const GetAllMessages = asyncHandler(async (req, res) => {
  const { chatId } = req.params;

  try {
    const messages = await MessageModel.find({ chat: chatId })
      .populate("sender", "name avatar email")
      .populate("chat");

    res.status(200).json({ status: 200, data: messages });
  } catch (error) {
    req.status(400);
    throw new Error(error.message)
  }
});



module.exports = { SendMessage, GetAllMessages }

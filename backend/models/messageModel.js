const { Schema, model } = require('mongoose');

const MessageSchema = new Schema({
    sender : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content : {
        type : String,
        trim : true
    },
    chat : {
        type : Schema.Types.ObjectId,
        ref : "Chat"
    }
},{ timestamps : true });


const MessageModel = new model("Message", MessageSchema);
module.exports = MessageModel;
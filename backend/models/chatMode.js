const { Schema, model } = require('mongoose');



const ChatSchema = new Schema({
    chatName : {
        type : String,
        trim : true
    },
    isGroupChat : {
        type : Boolean,
        default : false
    },
    groupAdmin : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    users : [{
        type : Schema.Types.ObjectId, 
        ref : "User"
    }],
    latestMessage : {
        type : Schema.Types.ObjectId,
        ref : 'Message'
    }
}, {timestamps : true});


const ChatModel = new model('Chat', ChatSchema);
module.exports = ChatModel;
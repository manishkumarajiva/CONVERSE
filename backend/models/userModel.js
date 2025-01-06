const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new Schema({
    isAdmin : {
        type : Boolean,
        default : false
    },
    name : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    avatar : {
        type : String,
        trim : true,
        default : 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
    }
},{ timestamps : true });



// @  Hash Password
UserSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});


// @ Method     Compare Password
UserSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password);
}

const UserModel = new model("User", UserSchema);
module.exports = UserModel;
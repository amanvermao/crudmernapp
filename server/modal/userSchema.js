const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true

    },
    age:{
        type: Number,
        required:true
    },
    mobile: {
        type: Number,
        required:true
    },
    work: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    desc: {
        type: String,
        required:true
    },
    image: String

});

const users = mongoose.model("users", UserSchema)

module.exports = users;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const User_Schema = new Schema({
    email : {
        type : String,
        required : true,
        unique : true,
    },
    name : {
        type : String,
        required : true,
    },
    password : {
        type : String,
        required : true,
    },
    image : {
        type : String,
        required : true,
        default : "default"
    },
})

const User = mongoose.model("user_module", User_Schema)

module.exports = User
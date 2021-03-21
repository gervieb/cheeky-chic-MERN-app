const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

const usersSchema = new mongoose.Schema({
    firstName:{type:String, unique: false, required: true},
    lastName:{type:String, unique: false, required: true},
    email:{type:String, unique: true, required: true, lowercase: true},
    password:{type:String, unique: false, required: true, minlength: 6 },
    password2:{type:String, unique: false, required: true, minlength: 6 },
    admin: {type:Boolean, default:false}
});

module.exports = mongoose.model('users', usersSchema);


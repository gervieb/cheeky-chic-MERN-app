const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const categoriesSchema = new Schema({
    category:{
        type:String, required:true, unique:true, lowercase: true
    },
})
module.exports =  mongoose.model('categories', categoriesSchema);
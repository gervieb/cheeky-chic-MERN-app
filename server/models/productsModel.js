const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const productsSchema = new Schema({
    title:{type:String, unique: true, required: true},
    description:{type:String, unique: false, required: true},
    price:{type:Number, unique: false, required: true},
    image:{type:String, unique: false, required: true},
    // id:{type:String, unique: false, required: false},
    category: {type: String, required: true},
    categoryID:{type:mongoose.Types.ObjectId, ref:'Categories'},
});
                                        
module.exports =  mongoose.model('products', productsSchema);
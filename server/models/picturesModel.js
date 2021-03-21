const mongoose = require('mongoose');

const pictureSchema = new mongoose.Schema({
    photo_url:{ 
        type:String, 
        unique:true, 
        required:true 
    },
    public_id:{ 
        type:String,
        unique:true, 
        required:true 
    }
});

module.exports = mongoose.model('pictures', pictureSchema);

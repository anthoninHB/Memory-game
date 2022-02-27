const mongoose = require('mongoose');

const userschema= mongoose.Schema({
    mail: {type :String, required: true},
    pass: {type: String, required: true},
    pseudo: {type: String, required: true},
    best_score: {type:Number, required: false}
});

module.exports = mongoose.model('User', userschema);
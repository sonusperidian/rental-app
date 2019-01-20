const mongoose = require('mongoose');

const schema = mongoose.Schema({
    username: {
        type: String,
        required:true,
        min: [4, 'User Id requrired minimium 4 characters.'],
        max: [12, 'User Id canot be more than 12 character.']
    },
    email:{
        type: String,
        required: true
    },
    password: {
        required: true,
        type: String,
        min: [4, 'User Id requrired minimium 4 characters.']
    },
    rentals: [{type: mongoose.Schema.Types.ObjectId, ref: 'Rental'}],
    bookings:[{type:mongoose.Schema.Types.ObjectId, ref:'Booking'}]
});

module.exports = mongoose.model('User', schema);
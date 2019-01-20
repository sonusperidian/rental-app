const mongoose= require('mongoose');

const schema = mongoose.Schema({
    startAt: {type: Date, required: 'Booking start date is required.'},
    endAt: {type: Date, required: 'Booking end date is required.'},
    totalPrice: Number,
    days: Number,
    guests: Number,
    createdAt: {type: Date, default: Date.now},
    user: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    rental: {type: mongoose.Schema.Types.ObjectId, ref: 'Rental'}
})

module.exports = mongoose.model('Booking',schema);
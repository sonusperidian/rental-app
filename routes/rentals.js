const express = require('express');
const router = express.Router();

const Rental = require('../server/rentalSchema');

router.get('/rentals/:id',(req,res)=>{
    const rentalId = req.params.id;
    // console.log('rental id call=>', rentalId);
    Rental.findById(rentalId).populate('bookings','startAt endAt -_id').exec((err,data)=>{
        res.json(data);
    })
    // Rental.findById(rentalId).then((data,err)=>{
    //     res.json(data);
    // })
})
router.get('/rentals',(req,res)=>{
    // console.log('User details:=>',res.locals.user)
    Rental.find().then((data,err)=>{
        res.json(data);
    })
});

module.exports = router;
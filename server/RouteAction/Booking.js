const moment = require('moment');

const Rental=require('../rentalSchema');
const Booking = require('../bookingSchema');

const ErrorHandler = require('../RouteAction/ErrorHandler');
exports.booking = (req,res,next)=>{
    try{
    const {startAt, endAt, guests,rentalId }= req.body;
    const days = (moment(endAt)-moment(startAt))/(1000*3600*24);
    
     console.log('Body=>',req.body);

    const user = res.locals.user;
     console.log('User=>',user);
    Rental.findById(rentalId).populate('user').populate('bookings').exec((error, foundRental)=>{
        const totalPrice = foundRental.dailyRate * days;
        const booking = new Booking({startAt, endAt,totalPrice:totalPrice,days:days,guests,user:user._id,rental:rentalId});
        const isvalid = isValid(booking, foundRental.bookings);
      
        // console.log('is valid=>',isvalid);
        if(!error&&isvalid){
            booking.save().then(response=>{
                // foundRental.bookings.push(booking);
                // foundRental.save();
                Rental.update({_id:rentalId},{$push:{bookings:booking}},(error, respons)=>{
                    if(error){
                        console.log(error);
                    }
                    return res.json(response)
                })
                
            }).catch(error=> next(ErrorHandler('Cannot find the details requsted, please try agin later...', 402)));
           
        }
        else{
                next(ErrorHandler('Selected dates are already taken', 402));
           }
    
        
    }
    );

    // return res.json({start: startAt, end: endAt, guest: guests, message:"Booking Confirmed",user:user._id});
    const isValid=(proposedBooking, rentalBookings)=>{
        // console.log('rental booking=>',rentalBookings);
        let valid = true;
        valid=rentalBookings.every((boking)=>{
            // console.log(booking);
            const propStartAt = proposedBooking.startAt
            const propEndAt = proposedBooking.endAt;
            const exStartAt = boking.startAt;
            const exEndAt = boking.endAt;
            // console.log(propStartAt,propEndAt, exStartAt, exEndAt)
            
            return ((exStartAt < propStartAt && exEndAt < propEndAt)||(propEndAt < exEndAt&& propEndAt < exStartAt))
        })
        return valid;
        

        // console.log(proposedBooking, '=>', rentalBookings)
    }
    }catch(error){
        console.log(error);
        const err = new Error('Cannot find the details requsted, please try agin later');
        err.statusCode = 402;
        throw err;
    }
}

const express = require('express');
const mongoose = require('mongoose');
const bodyparder = require('body-parser');

const newDB = require('./newDB');
const rentalRouter = require('../routes/rentals');
const Rental = require('./rentalSchema');
const userRoute = require('../routes/User');
const {authorizeUser} = require('./RouteAction/Register');
const bookingRouter = require('../routes/booking');

const app = express();
app.use(bodyparder.json());

mongoose.connect('mongodb://devuser:devuser_1@ds143953.mlab.com:43953/env-dev').then(()=>{
    console.log("Testing")
    const firstDB = new newDB();
    firstDB.SaveData();
});

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();

})
console.log('rental id index page=>');
app.use('/api/v1/rentals',authorizeUser, rentalRouter);
app.use('/api/v1/booking',authorizeUser, bookingRouter);
app.use('/api/v1/user', userRoute);

app.use((error,req,res,next)=>{
     console.log('error=>',error);
    const status = error.statusCode||500;
    const message = error.message;

    res.status(status).json({ message });
})

const PORT = process.env.PORT||3001
app.listen(PORT,()=>console.log('Server is up'));
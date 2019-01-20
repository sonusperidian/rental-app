const express = require('express');
const router = express.Router();

const bookingSchema = require('../server/bookingSchema');
const bookingAction = require('../server/RouteAction/Booking');

router.post('/rental', bookingAction.booking);

module.exports = router;
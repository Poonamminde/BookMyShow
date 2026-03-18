const bookingModel = require("../models/bookingModel");
const { bookingSchema } = require("../validation/bookingValidation");

exports.getBookedShows = async (req,res)=>{

  try{

    const userId = req.user.id;

    const bookings = await bookingModel.getUserBookings(userId);

    res.json({
      totalBookings: bookings.length,
      bookings
    });

  }
  catch(error){

    res.status(500).json({
      message:"Failed to fetch bookings",
      error:error.message
    });

  }

};

exports.createBooking = async (req,res)=>{

  try{

    const { error } = bookingSchema.validate(req.body);

    if(error){
      return res.status(400).json({
        message:error.details[0].message
      });
    }

    const userId = req.user.id;

    const { showId } = req.params;

    const { seatIds } = req.body;

    await bookingModel.createBooking(
      userId,
      showId,
      seatIds
    );

    res.status(201).json({
      message:"Seats booked successfully",
      seatsBooked: seatIds.length
    });

  }
  catch(error){

    res.status(400).json({
      message:error.message
    });

  }

};
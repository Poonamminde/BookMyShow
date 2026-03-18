const seatModel = require("../models/seatModel");

exports.getSeatsForShow = async (req,res)=>{

  try{

    const { showId } = req.params;

    if(!showId){
      return res.status(400).json({
        message:"Show ID required"
      });
    }

    const seats = await seatModel.getSeatsByShowId(showId);

    res.json({
      totalSeats: seats.length,
      seats
    });

  }
  catch(error){

    res.status(500).json({
      message:"Failed to fetch seats",
      error:error.message
    });

  }

};
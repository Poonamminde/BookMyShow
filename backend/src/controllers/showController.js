const showModel = require("../models/showModel");
const seatModel = require("../models/seatModel");

const { createShowSchema } = require("../validation/showValidation");

exports.createShow = async (req,res)=>{

  try{

    const { error } = createShowSchema.validate(req.body);

    if(error){
      return res.status(400).json({
        message:error.details[0].message
      });
    }

    const { name,start_at,duration } = req.body;

    const show = await showModel.createShow(
      name,
      start_at,
      duration
    );

    await seatModel.createSeatsForShow(show.id);

    res.status(201).json({
      message:"Show created successfully",
      show
    });

  }
  catch(err){

    res.status(500).json({
      message:"Server error",
      error:err.message
    });

  }

};

exports.getAllShows = async (req, res) => {

  try {

    const shows = await showModel.getAllShows();

    res.json({
      total: shows.length,
      shows
    });

  } catch (error) {

    res.status(500).json({
      message: "Failed to fetch shows",
      error: error.message
    });

  }

};

exports.getAvailableShows = async (req,res)=>{

  try{

    const shows = await showModel.getAvailableShows();

    res.json({
      total: shows.length,
      shows
    });

  }
  catch(error){

    res.status(500).json({
      message:"Failed to fetch shows",
      error:error.message
    });

  }

};
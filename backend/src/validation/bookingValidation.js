const Joi = require("joi");

const bookingSchema = Joi.object({

  seatIds: Joi.array()
    .items(Joi.number())
    .min(1)
    .max(10)
    .required()

});

module.exports = { bookingSchema };
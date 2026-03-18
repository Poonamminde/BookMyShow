const Joi = require("joi");

const createShowSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  start_at: Joi.date()
    .greater("now")
    .required()
    .messages({
      "date.greater": "Show start time must be in the future"
    }),

  duration: Joi.number()
    .integer()
    .min(30)
    .max(300)
    .required()
});

module.exports = { createShowSchema };
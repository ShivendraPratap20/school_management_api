const Joi = require("joi");

const schoolSchema = Joi.object({
    name: Joi.string()
        .min(5)
        .max(100)
        .required()
        .label("School Name")
        .messages({
            'string.empty': 'School name is required and must be a non-empty string',
            'string.min': 'School name must be at least 5 characters long',
            'string.max': 'School name must not exceed 100 characters',
            'any.required': 'School name is required',
        }),

    address: Joi.string()
        .min(5)
        .max(255)
        .required()
        .label("Address")
        .messages({
            'string.empty': 'Address is required and must be a non-empty string',
            'string.min': 'Address must be at least 5 characters long',
            'string.max': 'Address must not exceed 100 characters',
            'any.required': 'Address is required',
        }),

    latitude: Joi.number()
        .min(-90)
        .max(90)
        .required()
        .label("Latitude")
        .messages({
            'any.required': 'Latitude is required',
        }),

    longitude: Joi.number()
        .min(-180)
        .max(180)
        .required()
        .label("Longitude")
        .messages({
            'any.required': 'School name is required',
        })
});
module.exports = {schoolSchema}
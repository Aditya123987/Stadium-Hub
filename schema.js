const joi = require("joi");
module.exports.serverSchema = joi.object({
    name: joi.string()

        .min(3)

        .required(),
    capacity: joi.number()
        .integer()
        .min(0)
        .required(),
    image:joi.string()
            .required(),
    location: joi.string()

        .min(3)

        .required(),
    description: joi.string()

        .required(),

});
module.exports.reviewSchema = joi.object({
    rating: joi.number()

        .min(1).max(5)

        .required(),

    body: joi.string()



        .required(),


});
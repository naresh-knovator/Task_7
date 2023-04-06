const joi = require("joi");

const userValidate = joi.object({
  id: joi.number().integer().required(),
  name: joi.string().alphanum().required(),
  username: joi.string().alphanum().required(),
  email: joi.string().required(),
  address: joi.array().items({
    street: joi.string(),
    suite: joi.string(),
    city: joi.string(),
    zipcode: joi.string(),
    geo: joi.array().items({ lat: joi.string(), lng: joi.string() }),
  }),
  phone: joi.string().min(10).required(),
  website: joi.string().required(),
  company: joi
    .array()
    .items({ name: joi.string(), catchPhrase: joi.string(), bs: joi.string() }),
});

const albumValidate = joi.object({
  userId: joi.number().required(),
  id: joi.number().required(),
  title: joi.string().required(),
});

module.exports = {
  userValidate,
  albumValidate,
};

import Joi from "joi";
import roles from "../roles";

const userSchema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: true },
  }),

  role: Joi.string().valid(Object.values(roles)),
});

export default userSchema;

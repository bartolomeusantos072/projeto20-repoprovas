import joi from "joi";

export const userSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required(),
    confirmPassword: joi.ref('password')
  });
  
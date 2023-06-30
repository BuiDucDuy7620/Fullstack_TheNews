const Joi = require('joi')

const registerValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().min(11).max(40).required(),
        password: Joi.string().min(6).max(30).required()

    })
    return schema.validate(data)
}
const loginValidate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().min(11).max(40).required(),
        password: Joi.string().min(6).max(30).required()

    })
    return schema.validate(data)
}
const userUpdateValidate = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(30),

        email: Joi.string().email().min(11).max(40),
        password: Joi.string().min(6).max(30)

    })
    return schema.validate(data)
}
const newsCreateValidate = (data) => {
    const schema = Joi.object({
        
        userID: Joi.string().min(3).required(),
        title: Joi.string().min(3).required(),
        description: Joi.string().min(3).required(),
        content: Joi.string().min(3).required(),
        image: Joi.string().min(3).required()
    })
    return schema.validate(data)
}
const newsUpdateValidate = (data) => {
    const schema = Joi.object({
        title: Joi.string().min(0),
        description: Joi.string().min(0),
        content: Joi.string().min(0),
        image: Joi.string().min(0)
    })
    return schema.validate(data)
}
const commentCreateValidate = (data) => {
    const schema = Joi.object({
        userID: Joi.string().min(3).required(),
        newsID: Joi.string().min(3).required(),

        content: Joi.string().min(3).required()
    })
    return schema.validate(data)
}
const commentUpdateValidate = (data) => {
    const schema = Joi.object({
        content: Joi.string().min(3)
    })
    return schema.validate(data)
}

module.exports = { registerValidate, loginValidate, userUpdateValidate, newsCreateValidate, newsUpdateValidate, commentCreateValidate, commentUpdateValidate }
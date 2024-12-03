const mongoose = require('mongoose')
const RegisterSchema = new mongoose.Schema({
    privatekey: String,
    name: String,
    aspect: String,
    password: String
})
const RegisterModel = mongoose.model('registered', RegisterSchema)
module.exports = RegisterModel
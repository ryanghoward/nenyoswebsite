const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    roles: {
      User: {
          type: Number,
          default: 1006
      },
        President: Number,
        VicePresident: Number,
        Treasurer: Number,
        Secretary: Number,
        Director: Number
    },
    password: {
        type: String,
        required: true
    },
    refreshToken: String
})

module.exports = mongoose.model('User', userSchema)
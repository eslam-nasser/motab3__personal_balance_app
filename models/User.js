const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    name: {type: String, required: true},
    password: {type: String, required: true},
    // created_at: { type: Date, default: Date.now },
},{
    timestamps: true
})

const User = module.exports = mongoose.model('User', UserSchema)

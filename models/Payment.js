const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema({
    for: {type: String, required: true},
    description: {type: String, required: false},
    amount: {type: Number, required: true},
    importance: {type: Number, required: true, default: 2},
    created_at: { type: Date, default: Date.now },
})

const Payment = module.exports = mongoose.model('Payment', PaymentSchema)

const mongoose = require('mongoose')

const PaymentSchema = mongoose.Schema({
    for: {type: String, required: true},
    amount: {type: Number, required: true},
    importance: {type: Number, required: true, default: 1},
    created_at: { type: Date, default: Date.now },
})

const Payment = module.exports = mongoose.model('Payment', PaymentSchema)

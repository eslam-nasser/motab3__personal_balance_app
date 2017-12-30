const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const PaymentSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    for: {type: String, required: true},
    description: {type: String, required: false},
    amount: {type: Number, required: true},
    importance: {type: Number, required: true, default: 2},
    // created_at: { type: Date, default: Date.now },
},{
    timestamps: true
})

const Payment = module.exports = mongoose.model('Payment', PaymentSchema)

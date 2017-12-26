const mongoose = require('mongoose')

const IncomeSchema = mongoose.Schema({
    from: {type: String, required: true},
    amount: {type: Number, required: true},
    created_at: { type: Date, default: Date.now },
})

const Income = module.exports = mongoose.model('Income', IncomeSchema)

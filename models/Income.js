const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const IncomeSchema = mongoose.Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    from: {type: String, required: true},
    notes: {type: String, required: false},
    amount: {type: Number, required: true},
    where: {type: String, required: true},
    created_at: { type: Date, default: Date.now },
})

const Income = module.exports = mongoose.model('Income', IncomeSchema)

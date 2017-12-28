const express = require('express');
const router = express.Router();
const Income = require('../models/Income')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('income');
});
router.get('/all', function(req, res, next) {
    Income.find({})
        .exec((err, data) => {
            if(err) throw err;
            // Done
            res.json(data)
        })
});
 // new Data
router.post('/new', function(req, res, next) {
    let newIncome = new Income({
        for: req.body.for,
        amount: req.body.amount,
        importance: req.body.importance
    })
    newIncome.save((err, saved) => {
        if(err) throw err;
        res.json(saved)
    })
});


module.exports = router;

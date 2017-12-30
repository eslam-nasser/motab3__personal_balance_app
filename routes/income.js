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
        user: req.session.user.id,
        from: req.body.from,
        amount: req.body.amount,
        notes: req.body.notes,
        where: req.body.where
    })
    newIncome.save((err, saved) => {
        if(err) throw err;
        res.json(saved)
    })
});


module.exports = router;

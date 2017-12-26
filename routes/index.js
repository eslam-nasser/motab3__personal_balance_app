const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/all', function(req, res, next) {
    Payment.find({})
        .exec((err, data) => {
            if(err) throw err;

            let byday = {}
            data.map(function(value, index, array){
                d = new Date(value['created_at']);
                d = Math.floor(d.getTime()/(1000*60*60*24));

                console.log(d);
                byday[d]=byday[d]||[];
                byday[d].push(value);
            })

            console.log(byday);


            res.json(byday)
        })
});
 // new Data
router.post('/new', function(req, res, next) {
    let newPayment = new Payment({
        for: req.body.for,
        amount: req.body.amount,
        importance: req.body.importance
    })
    newPayment.save((err, saved) => {
        if(err) throw err;
        res.json(saved)
    })
});



function groupday(value, index, array){
    d = new Date(value['created_at']);
    d = Math.floor(d.getTime()/(1000*60*60*24));
    byday[d]=byday[d]||[];
    byday[d].push(value);
}



// var arabic = /[\u0600-\u06FF]/;
// var string = 'عربية‎'; // some Arabic string from Wikipedia
//
// alert(arabic.test(string)); // displays true


module.exports = router;

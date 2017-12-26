var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});



// var arabic = /[\u0600-\u06FF]/;
// var string = 'عربية‎'; // some Arabic string from Wikipedia
//
// alert(arabic.test(string)); // displays true


module.exports = router;

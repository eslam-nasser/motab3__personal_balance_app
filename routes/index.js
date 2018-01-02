const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    if (req.session && req.session.user &&  req.session.user.name && req.session.user.id){
        return res.redirect('/payment');
    }
    res.redirect('/users/login');
});

module.exports = router;

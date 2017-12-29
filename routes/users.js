const express = require('express');
const router = express.Router();
const User = require('../models/User')



router.get('/login', function(req, res, next) {
    res.render('auth', {type: 'login'})
});
router.get('/new-account', function(req, res, next) {
    res.render('auth', {type: 'register'})
});
router.post('/new-account', function(req, res, next) {
    let newUser = new User({
        name: req.body.name,
        password: req.body.password
    })

    newUser.save((err, saved) => {
        if(err) throw err;
        res.json(saved)
    })
});

module.exports = router;

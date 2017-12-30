const express = require('express');
const router = express.Router();
const User = require('../models/User')


// Login
router.get('/login', function(req, res, next) {
    res.render('auth', {type: 'login'})
});
router.post('/login', function(req, res, next) {
    User.findOne({name: req.body.name})
        .exec((err, user) => {
            if(err || !user || req.body.password !== user.password){
                return res.redirect('/users/login')
            }
            req.session.user = {
                id: user._id,
                name: user.name
            }
            res.redirect('/payment')
        })
});


// Register
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


// Logout
router.get('/logout', function(req, res, next) {
    req.session.user = null;
    res.redirect('/users/login');
});

module.exports = router;

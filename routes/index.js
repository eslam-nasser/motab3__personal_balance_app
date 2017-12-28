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

            // Group Logs By Day
            let groupedByDay = []
            data.map(function(value, index, array){
                let d = new Date(value['created_at']);
                let day_date = value.created_at
                d = Math.floor(d.getTime()/(1000*60*60*24));
                if (groupedByDay.filter(x => x.day_id === d).length > 0) {
                    let i = groupedByDay.map(function(e) { return e.day_id; }).indexOf(d);
                    groupedByDay[i].day_logs.push(value)
                }else{
                    let obj = {
                        day_id: d,
                        day_date: day_date,
                        day_logs: []
                    }
                    obj.day_logs.push(value)
                    groupedByDay.push(obj)
                }
            })

            // Sort Days by date
            groupedByDay.sort(function(a,b){
                return new Date(b.day_date) - new Date(a.day_date);
            });


            // Group by Month
            const monthNames = ["January", "February", "March", "April", "May", "June","July", "August", "September", "October", "November", "December"];
            let groupedByMonth = []
            groupedByDay.map(function(value, index, array){
                let d = new Date(value['day_date']);
                d = (d.getFullYear()-1970)*12 + d.getMonth();
                console.log(d);
                if (groupedByMonth.filter(x => x.id === d).length > 0) {
                    let i = groupedByMonth.map(function(e) { return e.id; }).indexOf(d);
                    groupedByMonth[i].days.push(value)
                }else{
                    let month = {
                        id: d,
                        month_name: monthNames[new Date(value['day_date']).getMonth()],
                        year: new Date(value['day_date']).getFullYear(),
                        days: []
                    }
                    month.days.push(value)
                    groupedByMonth.push(month)
                }
            })

            // Sort Months by date
            groupedByMonth.sort(function(a,b){
                return monthNames.indexOf(a.month_name) < monthNames.indexOf(b.month_name);
            });


            // Done
            res.json(groupedByMonth)
        })
});
 // new Data
router.post('/new', function(req, res, next) {
    let newPayment = new Payment({
        for: req.body.for,
        description: req.body.description,
        amount: req.body.amount,
        importance: req.body.importance
    })
    newPayment.save((err, saved) => {
        if(err) throw err;
        res.json(saved)
    })
});



/**
Day Schema
[
    {
        day_id: 123,
        day_date: {Date}
        day_logs: [{...},{...},{...}]
    }
]


Month Schema
[
    {
        id: 123,
        month_name: 'January',
        year: 2017,
        days: [{...},{...},{...}]
    }
]
}
*/


module.exports = router;

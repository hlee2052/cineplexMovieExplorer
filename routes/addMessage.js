var express = require('express');
var router = express.Router();
let app = require('../app.js')


/* GET users listing. */
router.post('/', function (req, res, next) {

    let db = app.getDb()
    let list = req.body
    for (let i = 0; i < list.length; i++) {
        list[i]['_id'] = list[i]['id']
    }

    db.collection('messages').insertMany(list, {ordered: false}).then(val => {
        res.json(req.body)
    }).catch(err => {
        console.log('failed')
        res.json(req.body)
    })
});

module.exports = router;



var express = require('express');
var router = express.Router();
let app = require('../app.js')
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

/* GET users listing. */
router.delete('/', function(req, res, next) {

    let db = app.getDb()
    db.collection('messages').deleteMany((err, items) => {

        if (err) {
            console.log('omg failed!')
        }
        res.json('success');
    })
});

module.exports = router;



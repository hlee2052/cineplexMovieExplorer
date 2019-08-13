var express = require('express');
var router = express.Router();
let app = require('../app.js')
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))


// Currently not being used
router.delete('/', function(req, res, next) {
    let db = app.getDb()
    db.collection('messages').deleteMany((err, items) => {

        if (err) {
            console.log('Failed to delete every messages')
        }
        res.json('success');
    })
});

module.exports = router;



var express = require('express');
var router = express.Router();
let app = require('../app.js')
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))

// Get individual item information, including comments

router.get('/:id', function (req, res, next) {
    let messageId = parseInt(req.params.id)
    console.log("Trying to get detailed message for the messageID: " + req.params.id)
    let db = app.getDb()
    db.collection('messages').findOne({_id: messageId}).then(val => {
        if (val.length === 0) {
            console.log("The element you want to get no longer exists!")
            res.status(404).send("Message is not found!!")
            return
        }
        res.json(val)

    })

});

module.exports = router;



var express = require('express');
var router = express.Router();
let app = require('../app.js')
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))


// Update the movie content, eg comments and rating
router.put('/:id', function (req, res, next) {

    let messageId = parseInt(req.params.id)
    let queryObject = {}
    queryObject = req.body

    let db = app.getDb()
    db.collection('messages').updateOne({_id: messageId}, {$push: {comments: queryObject}}, (error, val) => {
        if (error) {
            console.log("Failed to update existing messages")
        }
        let newObject = queryObject
        newObject.date = new Date()
        db.collection('commentRating').insertOne(newObject, (err, val) => {
            if (err) {
                console.log("Failed to insert comment rating")
            }
            res.json('ok')
        })
    })
});

module.exports = router;



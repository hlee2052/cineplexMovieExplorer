var express = require('express');
var router = express.Router();
let app = require('../app.js')
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended: false}))


// Unused at the moment
router.delete('/:id', function (req, res, next) {

    let messageId = parseInt(req.params.id)
    let db = app.getDb()
    db.collection('messages').deleteOne({_id: messageId}, (error, val) => {

        if (error) {
            console.log("failed to delete the item!")
            res.status(404).send('{message: Message does not exist in the db!}')
            return
        }

        if (val.deletedCount === 0) {
            console.log("no messages deleted!")
            res.status(404).send('{message was already deleted before calling delete!}')
            return
        }

        res.json("delete succeessful");
    })
});

module.exports = router;



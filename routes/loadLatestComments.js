var express = require('express');
var router = express.Router();
let app = require('../app.js')
var bodyParser = require('body-parser')

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({ extended: false }))

/* GET users listing. */
router.get('/:id', function(req, res, next) {

    let numEntries = parseInt(req.params.id)
    console.log("num of latest pages to load: "+req.params.id)

    let db = app.getDb()

    db.collection('commentRating').find( {}, { sort: { _id: -1 } }   ).limit(numEntries).toArray((err, items) => {

        if (err) {
            console.log('failed to query by given ids')
        }

        console.log('printing items' + items)
        res.json(items);
    })

});

module.exports = router;



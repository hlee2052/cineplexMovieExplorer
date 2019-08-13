var express = require('express');
var router = express.Router();
let app = require('../app.js')


/* GET users listing. */
router.post('/', function (req, res, next) {

    console.log(req.params.id)

    const delay = (ms) => {
        const startPoint = new Date().getTime()
        while (new Date().getTime() - startPoint <= ms) {/* wait */
        }
    }
    delay(1)

    let db = app.getDb()

    let listOfId = req.body['idToSearch']
    let queryIdList = []

    for (let i = 0; i < listOfId.length; i++) {
        let idObject = {id: parseInt(listOfId[i])}
        queryIdList = [...queryIdList, idObject]
    }

    db.collection('messages').find({$or: queryIdList}).toArray((err, items) => {
        if (err) {
            console.log('failed to query by given ids')
        }
        res.json(items);
    })
});

module.exports = router;
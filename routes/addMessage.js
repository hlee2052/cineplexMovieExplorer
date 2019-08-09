var express = require('express');
var router = express.Router();
let app = require('../app.js')


/* GET users listing. */
router.post('/', function(req, res, next) {

    let db = app.getDb()
   // let name = "messageId"
/*    db.collection('idCounter').findOneAndUpdate({ _id: name }, {$inc: {"sequence":1}})
        .then(val => {
    /!*        let nextId = val["value"]["sequence"]
            let object = {_id:'', name:'', type:'normal',
                date:new Date()}

            try {
                let inputName = req.body['name']
                object.name = inputName
                object._id=req.body['id']
            } catch (err) {
                console.log("failed to add a new message")
                res.status(400).send("failed to add new message!!!")
                return
            }*!/

            console.log()
            db.collection('messages').findOne({id:req.body['id']}).then(val=>{
                console.log('--------------------')
                console.log(val)

                let body = req.body

                body['_id'] = body['id'];
                console.log("==============================================")
                console.log(body)

                if (val == null) {
                    db.collection('messages').insertOne(req.body, (err, client)=> {
                        if (err) {
                            console.log("failed to enter new message")
                            res.status(400).send("failed to add new message!!!")
                            return
                        }
                        //console.log(val["value"]["sequence"])
                        //console.log(JSON.stringify(object))
                        res.json(body)
                    })
                    return
                }

            })


        })*/

   // console.log('ffffdddddddddddddddddddddddd')
   // console.log(req.body['id'])

    let list  = req.body
    for (let i=0; i<list.length;i++) {
        list[i]['_id'] = list[i]['id']
    }
    console.log('newly printing arr');
    //console.log(list)


    db.collection('messages').insertMany(list, {ordered:false}).then(val=>{
        /*let body = req.body[i]
        body['_id'] = body['id'];

        if (val == null) {

            db.collection('messages').insertOne(req.body[i], (err, client)=> {
                if (err) {
                    console.log("failed to enter new message")
                    res.status(400).send("failed to add new message!!!")
                    return
                }
                res.json(body)
            })

        }*/
        res.json(req.body)
    }).catch(err => {
        console.log('failed')
        res.json(req.body)
    })



/*    for (let i=0; i<req.body.length; i++) {
        db.collection('messages').findOne({id:req.body[i]['id']}).then(val=>{
            let body = req.body[i]
            body['_id'] = body['id'];

            if (val == null) {

                db.collection('messages').insertOne(req.body[i], (err, client)=> {
                    if (err) {
                        console.log("failed to enter new message")
                        res.status(400).send("failed to add new message!!!")
                        return
                    }
                    res.json(body)
                })

            }
        })
    }*/
});

module.exports = router;



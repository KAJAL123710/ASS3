const e = require('express');
const express = require('express');
const { isObjectIdOrHexString } = require('mongoose');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Data } = require('../models/data');

// => localhost:3000/data/
router.get('/',(req, res)=>{
    Data.find((err, docs) => {
        if (!err) {res.send(docs); }
        else {console.log('Error in Retriving Employees :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req,res)=> {
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : $(req.params.id)');

    Data.findById(req.params.id, (err, doc) => {
        if (!err) {res.send(doc); }
        else { console.log('Error in Retriving Employee :' + JSON.stringify(err, undefined, 2));}
    });
});

router.post('/', (req,res) =>{
    var data = new Data({
        fullname: req.body.fullname,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        address: req.body.addresss,
        number: req.body.number,
    });
    data.save((err, doc)=>{
        if (!err) {res.send(doc); }
        else {console.log('Error in Data Save :' + JSON.stringify(err, undefined, 2));}
    });
});

router.put('/:id',(req,res) =>{
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id : ${req.params.id}');

    var data = {
        fullname: req.body.fullname,
        name: req.body.name,
        price: req.body.price,
        quantity: req.body.quantity,
        address: req.body.address,
        number: req.body.number,

    };
    Data.findByIdAndUpdate(req.params.id, { $set: data }, { new: true }, (err, doc) =>{
        if (!err) { res.send(doc); }
        else {console.log('Error in Data Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id',(req,res)=> {
    if(!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id: ${req.params.id}');

    Data.findByIdAndRemove(req.params.id, (err,doc)=> {
        if(!err) { res.send(doc); }
        else {console.log('error in Employee Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;
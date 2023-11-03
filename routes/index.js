
var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const ProductSchema= require("../ProductSchema");

const dbURI =
  "mongodb+srv://elmiUser:Amina@cluster0.fh0dilb.mongodb.net/store?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  })

router.get('/', function (req, res) {
  res.sendFile('index.html');

});


router.get('/ProductSchema', function (req, res) {

  ProductSchema.find({}, (err, AllProducts) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
    res.status(200).json(AllProducts);
  });
});

router.post('/NewToDo', function(req, res) {

  let oneNewToDo = new ToProduct(req.body);  
  console.log(req.body);
  oneNewToDo.save((err, todo) => {
    if (err) {
      res.status(500).send(err);
    }
    else {
    console.log(todo);
    res.status(201).json(todo);
    }
  });
});
module.exports = router;
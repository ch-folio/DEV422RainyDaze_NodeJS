var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  size: String,
  color: String,
  imageUrl: String
});

const Product = mongoose.model("Product", productSchema);

const dbURI = "mongodb+srv://elmiUser:Amina@cluster0.fh0dilb.mongodb.net/store?retryWrites=true&w=majority";

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log("Couldn't connect to MongoDB");
  });

router.get('/', function (req, res) {
  res.sendFile('index.html');
});

router.get('/products', function (req, res) {
  Product.find({}, function (err, allProducts) {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.status(200).json(allProducts);
    }
  });
});

router.post('/products/new', function (req, res) {
  let newProduct = new Product(req.body);
  console.log(req.body);
  newProduct.save(function (err, product) {
    if (err) {
      res.status(500).send(err);
    } else {
      console.log(product);
      res.status(201).json(product);
    }
  });
});

module.exports = router;
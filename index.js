const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser');
const Product = require('./src/models/product');
const Category = require('./src/models/category');


require('dotenv').config();

const app = express();


app.use(cors());

mongoose.connect(process.env.MONGODB_URI, {}
).then(() => { console.log("Connected to the database") }).catch(e => console.log(e));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/products', async (req, res) => {
    try {
        const { category } = req.query;
        const products = await Product.find(category ?
            { category: { $in: await Category.find({ slug: category }).distinct('_id') } } : {}
        ).populate('category');
        
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


app.use('/categories', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/products/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});




app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT

app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});

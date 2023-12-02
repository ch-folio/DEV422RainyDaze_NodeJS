const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors")
const path = require("path")
const bodyParser = require('body-parser');
const Product = require('./src/models/product');
const Category = require('./src/models/category');
const port = 3000;

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

app.get('/search/:q', async (req, res) => {
    try {
        const { q } = req.params;

        if (!q) {
            return res.status(400).json({ message: 'Search query parameter (q) is required' });
        }

        const searchPattern = new RegExp(q, 'i');

        const products = await Product.find({
            $or: [
                { name: searchPattern },
                { category: { $in: await Category.find({ name: searchPattern }).distinct('_id') } },
            ]
        }).populate("category");

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
app.post('/api/login', (req, res) => {
    // Handle POST request here
    console.log(req.body); // Print the POST request body to console
    res.redirect('http://localhost:4200/dashboard/')
  });


app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log('Server is running on http://localhost:' + port);
});

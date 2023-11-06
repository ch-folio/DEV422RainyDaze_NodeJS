const mongoose = require('mongoose');


require('dotenv').config();
const port = process.env.PORT

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
   
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    size: String,
    color: String,
    imageUrl: String
});


productSchema.methods.toJSON = function () {
    const product = this.toObject();
    product.imageUrl = `http://localhost:${port}${product.imageUrl}`;
    product.id = this._id
    return product;
}
module.exports = mongoose.model('Product', productSchema);

const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    purchaseDate: { type: Date, default: Date.now },
    purchases: [
        {
            productId: { type: String },
            category: { type: String, },
            price: { type: Number, required: true },
            size: { type: String },
            color: { type: String },
            imageUrl: { type: String },
            quantity: { type: Number },
        },
    ],
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
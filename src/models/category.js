const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: String,
    slug: String
});

categorySchema.methods.toJSON = function () {
    const category = this.toObject();
    category.id = this._id
    return category;
}
module.exports = mongoose.model('Category', categorySchema);

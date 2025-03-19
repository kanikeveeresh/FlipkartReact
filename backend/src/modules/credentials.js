const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        email: String,
        password: String,
    }
);

const User = mongoose.model("User", userSchema);

const itemsSchema = mongoose.Schema({
    items: [
        {
            tag: String,
            content: String,
            _id: false
        }
    ]
},{timeStamps: true, collection: 'cartItems'});

const CartItems = mongoose.model("CartItems", itemsSchema);

module.exports = { User, CartItems };
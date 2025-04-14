const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        email: String,
        password: String,
    }
);

const User = mongoose.model("User", userSchema);

const itemsSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true},
    items: [
        {
            title: String,
            image: String,
            desc: String,
            quantity: Number,
            price: Number,
        }
    ]
},{timeStamps: true, collection: 'cartItems'});

const CartItems = mongoose.model("CartItems", itemsSchema);

module.exports = { User, CartItems };
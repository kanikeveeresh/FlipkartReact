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

const addressSchema = mongoose.Schema({
    email: {type: String, required: true},
    addresses: [
        {
            firstName: {type: String},
            lastName: {type: String},
            pincode: {type: String},
            address: {type: String},
            city: {type: String},
            state: {type: String},
            type: {type: String}
        }
    ]
});

const addressDetails = mongoose.model("address", addressSchema);

module.exports = { User, CartItems, addressDetails };
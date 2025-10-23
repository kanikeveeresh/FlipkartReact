const { CartItems } = require("../modules/credentials.js");

const getCartCount = async(req, res) => {
    const {email} = req.query;
    try {
        const findEmail = await CartItems.findOne({email});
        const cartCount = findEmail.items.length || 0;
        res.status(200).json({count: cartCount, message: `You have ${cartCount} Items`});
    }
    catch(err) {
        res.status(500).json({count: 0, message: "Internal server error"});
    }
}

const setItemCount = async(req, res) => {
    try {
        const { email, id, count } = req.body;
        const userCart = await CartItems.findOne({email});
        if(!userCart) {
            return res.status(404).json({message: "User not found"});
        }
        const cartItem = userCart.items.find(item => item._id.toString() === id);
        if(!cartItem) {
            return res.status(404).json({message: "Item not found"});
        }
        cartItem.quantity = count;
        await userCart.save();
        res.status(200).json({message: "Item count updated successfully!"});
    }
    catch(err) {
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = { getCartCount, setItemCount };
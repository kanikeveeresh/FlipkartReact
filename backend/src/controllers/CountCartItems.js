const { CartItems } = require("../modules/credentials.js");

const getCartCount = async(req, res) => {
    const {email} = req.query;
    try {
        const findEmail = await CartItems.findOne({email});
        const cartCount = findEmail.items.length || 0;
        res.status(200).json({count: cartCount, message: `You have ${cartCount} Items`});
    }
    catch(err) {
        res.status(500).json({count: 0, message: "Internal server error"})
    }
}

module.exports = { getCartCount };
const { CartItems } = require("../modules/credentials.js");

const getCartCount = async(req, res) => {
    try {
        const cartCount = await CartItems.countDocuments();
        res.status(200).json({count: cartCount, message: `You have ${cartCount} Items`});
    }
    catch(err) {
        res.status(500).json({count: 0, message: "Internal server error"})
    }
}

module.exports = { getCartCount };
const { CartItems } = require("../modules/credentials.js");

const cartGetItems = async(req, res) => {

    const { email } = req.query;
    try {
        const Cart = await CartItems.findOne({ email });
        if(Cart) {
            return res.status(200).json(Cart.items);
        }
        else {
            return res.status(200).json([]);
        }
    }
    catch(err) {
        res.status(500).json({message: "Internal server error"});
    }
};

module.exports = { cartGetItems }
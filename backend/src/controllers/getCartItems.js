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

const deleteItem = async(req, res) => {
    try {
        const { email, id } = req.body;
        const userCart = await CartItems.findOne({email});
        if(!userCart) {
            return res.status(404).json({message: "User not found!"});
        }

        if(!id) {
            userCart.items = [];
            await userCart.save();
            return res.status(200).json({message: "All items deleted successfully"});
        }

        userCart.items = userCart.items.filter((item) => item._id.toString() !== id);
        await userCart.save();
        res.status(200).json({message: "Item deleted successfully!"});
    }
    catch(err) {
        res.status(500).json({message: "Internal server error..."});
    }
}

module.exports = { cartGetItems, deleteItem }
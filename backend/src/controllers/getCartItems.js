const { CartItems } = require("../modules/credentials.js");

const cartGetItems = async(req, res) => {
    try {
        const Items = await CartItems.find({});
        res.status(200).json(Items);
    }
    catch(err) {
        res.status(500).json({message: "Internal server error"});
    }
};

module.exports = { cartGetItems }
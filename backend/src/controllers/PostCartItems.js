const { CartItems } = require('../modules/credentials.js');

const cartPostItems = async(req, res) => {
    try {
        const { items } = req.body;

        const eleCheck = items.map(el => el.content);
        const exists = await CartItems.findOne({
            items: {
                $elemMatch: {
                    tag: 'h2',
                    content: {$in: eleCheck}
                }
            }
        });

        if(exists) {
            return res.status(200).json({message: "Already Items are Exists"});
        }
        const savedItems = await CartItems.create({ items });
        res.status(200).json({message: "Content saved successfully", recievedData: savedItems});
    }
    catch(err) {
        console.error("Error sending data", err);
        res.status(500).json({message: "Internal server error"});
    }
};

module.exports = { cartPostItems };
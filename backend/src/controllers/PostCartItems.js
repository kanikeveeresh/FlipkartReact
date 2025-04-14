const { CartItems } = require('../modules/credentials.js');

const cartPostItems = async(req, res) => {
    try {
        const { email, items } = req.body;

        const existingEmail = await CartItems.findOne({email});

        if(existingEmail) {
            const existingItems = (existingEmail.items || []).map(item => item.title);
            const newItems = items.some(item => existingItems.includes(item.title));

            if(newItems) {
                return res.status(200).json({message: "Items already exists in the cart!"});
            }

            existingEmail.items = [...(existingEmail.items || []), ...items];
            await existingEmail.save();
            return res.status(200).json({message: "Items added successfully in the cart!"});
        }

        const newCart = await CartItems.create({email, items});
        res.status(200).json({message: "New cart created successfully!"});
    }
    catch(err) {
        console.error("Error sending data", err);
        res.status(500).json({message: "Internal server error"});
    }
};

module.exports = { cartPostItems };
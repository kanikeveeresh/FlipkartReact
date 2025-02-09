const User = require("../modules/credentials.js");

const saveCred = async (req, res) => {
    try {
        const {email, password, requestType} = req.body;
        
        if(!email || !password) {
            return res.status(400).json({message: "Email and password are required."});
        }

        const newUser = new User({email, password});
        await newUser.save();

        res.status(201).json({message: "Credentials saved successfully."});
    }
    catch(err) {
        res.status(500).json({message: "Server error."});
    }
}

module.exports = { saveCred };
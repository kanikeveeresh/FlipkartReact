const { User } = require("../modules/credentials.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.SECRET_KEY || "f4b72dff3b4a8df6e6b6a16c7e0eaf7df10a6a19b2b229f4a3893f5292a9e589";

const checkMailandPass = async (req, res) => {
    const {email, password} = req.body;
    if(!email) {
        return res.status(400).json({message: "Email required."});
    }
    if(!password) {
        return res.status(400).json({message: "Password required."});
    }

    try {

        const user = await User.findOne({email});

        if(!user) {
            return res.status(404).json({message: "User not found."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({message: "Incorrect Password."});
        }

        const token = jwt.sign({email: user.email, id: user._id}, SECRET_KEY, {expiresIn: "1h"});
        return res.status(200).json({message: "Email and Password verified successfully.", token, email});
    }
    catch(err) {
        return res.status(500).json({message: "Server error"});
    }
}

module.exports = { checkMailandPass }
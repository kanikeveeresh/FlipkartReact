const User = require("../modules/credentials.js");
const bcrypt = require("bcrypt");

const checkMailandPass = async (req, res) => {
    const {email, password} = req.body;
    if(!email) {
        return res.status(400).json({message: "Email required."});
    }
    if(!password) {
        return res.status(400).json({message: "Password required."});
    }

    const user = await User.findOne({email});

    try {

        if(!user) {
            return res.status(404).json({message: "User not found."});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(401).json({message: "Incorrect Password."});
        }
        return res.status(200).json({message: "Email and Password verified successfully."})
    }
    catch(err) {
        return res.status(500).json({message: "Server error"})
    }
}

module.exports = { checkMailandPass }
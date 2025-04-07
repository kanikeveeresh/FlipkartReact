const { User } = require("../modules/credentials.js");

const checkMail = async (req, res) => {
    const {email} = req.body;
    const exists = await User.findOne({email});

    try {
        if(!email) {
            return res.status(400).json({message: "Email required."});
        }

        if(exists) {
            return res.status(200).json({message: "exists"});
        }
        return res.status(200).json({message: "not exists"});
    }
    catch (err) {
        return res.status(500).json({message: exists});
    }
}

module.exports = {checkMail};
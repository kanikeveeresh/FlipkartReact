const { addressDetails } = require("../modules/credentials.js");

const AddAddress = async (req, res) => {
    try {
        const { email, addresses } = req.body;
        if(!email || !addresses || addresses.length === 0) {
            return res.status(400).json({message: "Invalid data!"});
        }
        const existingEmail = await addressDetails.findOne({email});
        
        if(existingEmail) {
            existingEmail.addresses = [...(existingEmail.addresses || []), ...addresses];

            await existingEmail.save();
            return res.status(200).json({message: "Address added successfully"});
        }

        await addressDetails.create({email, addresses});
        res.status(200).json({message: "New user address added successfully!"});
    }
    catch(err) {
        res.status(500).json({message: "Internal server error!", err});
    }
}

const getAddressDetails = async(req, res) => {
    try {
        const { email } = req.query;

        const existingEmail = await addressDetails.findOne({email});

        if(!existingEmail) {
            return res.status(404).json({message: "User not found!"});
        }

        if(existingEmail) {
            return res.status(200).json(existingEmail.addresses);
        }
        else {
            return res.status(200).json([]);
        }
    }
    catch(err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

const UpdateAddress = async (req, res) => {
    try {
        const { email, addressId, editDetails } = req.body;

        if(!email && !addressId && !editDetails) {
            return res.status(200).json({message: "All fields are required!"});
        }
        
        const existingEmail = await addressDetails.findOneAndUpdate(
            {email: email, "addresses._id": addressId},
            {$set: {"addresses.$": editDetails}},
            {new: true}
        )

        if(!existingEmail) {
            return res.status(404).json({message: "User not found"});
        }
        return res.status(200).json({message: "Address Updated Successfully!"});
    }
    catch(err) {
        res.status(500).json({message: "Internal server error"});
    }
}

const DeleteAddress = async (req, res) => {
    try {
        const { email, addressId } = req.body;

        const existingEmail = await addressDetails.findOne({email});

        if(!existingEmail) {
            return res.status(404).json({message: "User not found"});
        }

        existingEmail.addresses = existingEmail.addresses.filter((address) => address.id.toString() !== addressId);

        await existingEmail.save();
        res.status(200).json({message: "Address deleted successfully!"});
    }
    catch(err) {
        res.status(500).json({message: "Internal server error"});
    }
}

module.exports = { AddAddress, getAddressDetails, UpdateAddress, DeleteAddress }
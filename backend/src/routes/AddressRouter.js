const express = require("express");
const { AddAddress, getAddressDetails, UpdateAddress, DeleteAddress } = require("../controllers/AddressController.js");

const route = express.Router();

route.post("/addaddress", AddAddress);
route.get("/getaddresses", getAddressDetails);
route.put("/updateaddress", UpdateAddress);
route.delete("/deleteaddress", DeleteAddress);

module.exports = route;
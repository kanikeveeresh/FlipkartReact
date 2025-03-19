const express = require("express");
const { getCartCount } = require("../controllers/CountCartItems.js");
const { cartGetItems } = require("../controllers/getCartItems.js");
const { cartPostItems } = require("../controllers/PostCartItems.js");

const route = express.Router();

route.get("/getCount", getCartCount);
route.get("/getItems", cartGetItems);
route.post("/data/items", cartPostItems);

module.exports = route;
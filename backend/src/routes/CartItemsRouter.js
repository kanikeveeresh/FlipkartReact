const express = require("express");
const { getCartCount, setItemCount } = require("../controllers/CountCartItems.js");
const { cartGetItems, deleteItem } = require("../controllers/getCartItems.js");
const { cartPostItems } = require("../controllers/PostCartItems.js");

const route = express.Router();

route.get("/getCount", getCartCount);
route.get("/getItems", cartGetItems);
route.post("/data/items", cartPostItems);
route.post("/setcount", setItemCount);
route.delete("/deleteitem", deleteItem);

module.exports = route;
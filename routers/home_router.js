const express = require("express");
const home_controller = require("../controllers/home_controller");
const home_router = express.Router();

home_router.post("/mailsend",home_controller.mailsend);
home_router.get("/basket",home_controller.basket);
home_router.get("/approve/:id",home_controller.approve);
home_router.get("/shop",home_controller.shop);
home_router.get("/",home_controller.index);

module.exports = home_router;
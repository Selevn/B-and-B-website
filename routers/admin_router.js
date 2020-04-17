const express = require("express");
const admin_controller = require("../controllers/admin_controller.js");
const admin_router = express.Router();
const passport = require("passport");

admin_router.get("/addpanel",require('connect-ensure-login').ensureLoggedIn(),admin_controller.addpanel);
admin_router.post("/addGood",require('connect-ensure-login').ensureLoggedIn(),admin_controller.AddGoods);
admin_router.post("/editGood",require('connect-ensure-login').ensureLoggedIn(),admin_controller.EditGood);
admin_router.get("/edit/:id",require('connect-ensure-login').ensureLoggedIn(),admin_controller.edit);
admin_router.post("/delete/:id",require('connect-ensure-login').ensureLoggedIn(),admin_controller.delete);
admin_router.post("/",passport.authenticate('local', { failureRedirect: '/admin/login' }),admin_controller.loginto_post);
admin_router.get("/",require('connect-ensure-login').ensureLoggedIn(),admin_controller.loginto_get);
admin_router.get("/login",admin_controller.loginto_get_login_page);
admin_router.get("/logout",require('connect-ensure-login').ensureLoggedIn(),admin_controller.logout);
admin_router.get("/orders",require('connect-ensure-login').ensureLoggedIn(),admin_controller.orders);
admin_router.post("/orders/delete/:id",require('connect-ensure-login').ensureLoggedIn(),admin_controller.delete_order);

module.exports = admin_router;


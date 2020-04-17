var Goods = require("../models/goods");
var orders = require("../models/orders");
var passport = require("passport");

exports.loginto_get_login_page = function (request, response) {
    response.render("admin_login.hbs",{});
};

exports.orders = function (request, response) {
    orders.get_all_query(function(err,data){
        if (err)
            console.log(err);
        else response.render("admin_orders.hbs",
        {
            goods: data
        });});
};
exports.delete_order = function (request, response) {
    orders.delete(request.params.id);
    response.redirect("/admin/orders");
};
exports.login = function (request, response) {
    response.render("admin_login.hbs");
};
exports.loginto_get = function (request, response) {
    console.log('\x1b[36m%s\x1b[0m',"Access Allowed");
    Goods.get_all_query(function(err,data){if (err)console.log(err);else response.render("admin.hbs",
        {
            goods: data
        });});
};
exports.logout = function(req, res){
    req.logout();
    res.redirect('/admin/login');
};


exports.loginto_post = function (request, response)
{
    passport.authenticate('local', { failureRedirect: '/admin/login' });
    response.redirect('/admin');
};
exports.addpanel = function(request, response)
{
    response.render("add.hbs");
};
exports.AddGoods = function(request, response)
{
    if(Goods.add(request.body.cathegory, request.body.name, request.body.description, request.body.price))
    {
        response.redirect("/admin");
    }
    else
    {
        response.redirect("/admin");
    }
};

exports.edit = function (request, response) {
    Goods.get_one_query(request.params.id, function(err, data){if (err)console.log(err); else response.render("edit.hbs",
        {
            goods: data[0]
        });});};
exports.EditGood =  function (request, response) {
    Goods.upd(request.body.id,request.body.cathegory, request.body.name, request.body.description, request.body.price);
    response.redirect("/admin");
};
exports.delete = function (request, response) {
    Goods.delete(request.params.id);
    response.redirect("/admin");
};
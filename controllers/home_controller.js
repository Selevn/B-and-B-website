const Goods = require("../models/goods");

exports.index = function (request, response) {
    response.sendFile(public_path + "/index.html");
};
exports.shop = function (request, response,next) {
    Goods.get_all_query(function(err,data){if (err)console.log(err);else response.render("shop.hbs",{goods:data})});
};

exports.basket = function (request, response)
{
    try {
        var busket = JSON.parse(request.query.atr);
    }
    catch (e) {
        busket = {};
    }
    Goods.get_backet(busket, function(err, data){if (err)console.log(err); else
    {
        response.render("basket.hbs",
            {
                goods: data
            });}
    });
};


exports.mailsend = function (request, response)
{
    const order = require("../models/orders");
    const mail = require("../models/mail");

    json_input = request.body.atr;
    var qq = JSON.parse(request.body.atr);
    var u_mail = qq[0].mail;
    var quit = [];
    qq.forEach(function (item, i, cards) {
        if (i!=0)
            quit.push(item);
    });
    quit = JSON.stringify(quit);
    //generate key
    var time = Date.now();
    time +='';
    time = time.slice(8);
    time+=getRandomInt(1000,9999)+'';
    //time - key
    //add into db
    var t = new Date();
    ret = (t.getMonth()-0)+1;
    var a = t.getFullYear()+"-"+ret+"-"+t.getDate();
    order.add(time,u_mail,quit,a,false);
    mail.send_data(time,require('../settings').url_settings+"/approve/"+time,u_mail);
    response.send("Ваш заказ успешно принят");
};
function getRandomInt(min, max)
{
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.approve = function (request, response) {
    const order = require("../models/orders");
    order.sertify(request.params.id,function(err,data)
    {
        if (err)console.log(err);
        else
        {
            if(data.length!=0)
            {
                response.render("approve.hbs",
                    {
                        number: data[0].id
                    })
            }
            else
                response.render("approve.hbs",
                    {
                        number:request.params.id+" не "
                    })
        }
    });
};

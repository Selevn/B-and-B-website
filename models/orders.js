const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: require("../settings").sql_connectionLimit,
    host: require("../settings").sql_host,
    user: require("../settings").sql_user,
    database: "goodsDB",
    password: require("../settings").sql_password
});
module.exports.add = function (id,mail,data,reg_date,approved){
    pool.query("INSERT INTO goods_orders (id,mail,data,register_date,approved) VALUES (?,?,?,?,?)",[id,mail,data,reg_date,approved], function(err,data)
    {
        if(err)
            console.log(err);
        else
            console.log("Inserting in goods_orders SUCCESS");
    })
};

module.exports.delete = function (id){
    pool.query("DELETE FROM goods_orders WHERE id = ?",[id], function(err,data)
    {
        if(err)
            console.log("Deliting in SQL ERROR");
    })
};
module.exports.sertify = function (id,callback){
        pool.query("UPDATE goods_orders SET approved=1 WHERE id = ?",[id], function(err,data)
        {
            if(err)
                console.log("UPD in SQL values ERROR");
        });
    pool.query("SELECT * FROM goods_orders WHERE id = ?",[id], function(err,data)
    {
        if(err)
            callback(err,null);
        else
        {
            callback(null,data);
        }
    })
};


function getAll_query(callback)
{
    pool.query("SELECT * FROM goods_orders", function(err, data) {
        if(err)
            callback(err,null);
        else
        {
            callback(null,data);
        }

    });
}
module.exports.get_all_query = getAll_query;

module.exports.show_approved = function(callback)
{
    pool.query("SELECT * FROM goods_orders WHERE approved=1", function(err, data) {
        if(err)
            callback(err,null);
        else
        {
            callback(null,data);
        }

    });
};
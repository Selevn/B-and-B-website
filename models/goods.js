const mysql = require("mysql2");

const pool = mysql.createPool({
    connectionLimit: require("../settings").sql_connectionLimit,
    host: require("../settings").sql_host,
    user: require("../settings").sql_user,
    database: "goodsDB",
    password: require("../settings").sql_password
});
module.exports.add = function (category, name, description, price){
    pool.query("INSERT INTO goods (category, name, description, price) VALUES (?,?,?,?)",[category, name, description, price], function(err,data)
    {
        if(err)
            console.log("Inserting in SQL values ERROR");
    })
};
module.exports.upd = function (id,category,name,description,price){
    pool.query("UPDATE goods SET category=?, name=?, description=?, price=? WHERE id = ?",[category,name,description,price,id], function(err,data)
    {
        if(err)
            console.log("Editing in SQL values ERROR");
    })
};
module.exports.delete = function (id){
    pool.query("DELETE FROM goods WHERE id = ?",[id], function(err,data)
    {
        if(err)
            console.log("Deliting in SQL ERROR");
    })
};

function getAll_query(callback)
{
    pool.query("SELECT * FROM goods", function(err, data) {
        if(err)
            callback(err,null);
        else
        {
            callback(null,data);
        }

    });
}
module.exports.get_all_query = getAll_query;

function getOne_query(id, callback)
{
    pool.query("SELECT * FROM goods WHERE id = ?",[id], function(err, data) {
        if(err)
            callback(err,null);
        else
            callback(null,data);

    });
}

module.exports.get_one_query = getOne_query;

function getArr_query(id)
{
    return new Promise(function (resolve,reject) {
        pool.query("SELECT * FROM goods WHERE id = ?",[id], function(err, data) {
            if(err)
                return reject(err);
            else
                resolve(data);
        });
    })

}
module.exports.getArr_query = getArr_query;
function by_id(a,b)
{
    if(a.id>b.id) return 1;
    else if (a.id===b.id) return 0;
    else return -1;
}

function get_backet_query(data, callback) //получает data из bd and calls callback
{
    var ids = [];
    data.atr.sort(by_id);
    var counts = [];
    data.atr.forEach(function(element){ids.push(element.id);counts.push(element.count);});//todo verification
    var sql_query = "SELECT * FROM goods WHERE id IN (?)";
    pool.query(sql_query,[ids],function(err, data) {
        var i = 0;
        data.forEach(function (item) {
            item.count = counts[i];
            i++;
        });
        if(err)
            callback(err,null, null);
        else
            callback(null,data);

    });
}
module.exports.get_backet = get_backet_query;




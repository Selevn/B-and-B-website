//launch for creating db
const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "goodsDB"
});

connection.connect();

connection.query("CREATE DATABASE goodsDB",
    function(err, results) {
        if(err) console.log(err);
        else console.log("База данных создана");
    });//category, name, description, price

var sql = `create table if not exists goods(
  id int primary key auto_increment,
  category varchar(255) not null,
  name varchar(255) not null,
  description varchar(255) not null,
  price int not null
)`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица goods создана");
});
var sql = `create table if not exists goods_orders (
                  id int(11) NOT NULL,
                  mail text NOT NULL,
                  data longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(data)),
                  register_date date NOT NULL,
                  approved tinyint(1) NOT NULL,
                  PRIMARY KEY (id)
                ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;`;

connection.query(sql, function(err, results) {
    if(err) console.log(err);
    else console.log("Таблица goods_orders создана");
});
connection.end();
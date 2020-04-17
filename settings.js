//IP AND PORT
module.exports.ip = ip = '127.0.0.1';
module.exports.port = port = 8082;

//ADMIN ACCESS
module.exports.admin_panel = {
                                login:"1234",
                                pass:"1234"
                             };
//MAIL SETTINGS
module.exports.mail_settings = {
    host: 'smtp.mail.ru',
    port: 465,
    secure: true, //true --> will use ssl
    auth: {
        user: '',//ENTER USERNAME
        pass: ''//ENTER PASSWORD
    }
};
//SQL SETTINGS
module.exports.sql_connectionLimit = 5; //connection pool limit
module.exports.sql_host = "localhost";//connection host
module.exports.sql_user = "root";//connection user
module.exports.sql_password = "";//connection password

//GLOBAL URL OF PROJECT
module.exports.url_settings =
"http://"+ip+':'+port;

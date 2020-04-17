//IMPORTANT! SOME OF LOADED MODULES WERE CHANGED
//PLEASE USE THIS node_modules FOR CORRECT WORK

global.start_path = __dirname;
global.public_path = __dirname+"/public";
/*---------------------------------*/
const ip = require('./settings').ip;
const port = require('./settings').port;
/*---------------------------------*/

var express = require('express');
var passport = require('passport');

require("./pass");

var app = express();

app.use(express.static(public_path));

/*---------------------------------*/
const admin_router = require("./routers/admin_router.js"); //для админ панели
const home_router = require("./routers/home_router.js");

const bodyParser = require("body-parser");

app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//session settings
app.use(
    require('express-session')(
        {
            secret: 'Alice_in_wonderland',
            cookie:
                {
                    path: '/',
                    httpOnly:true,
                    maxAge:30*10*1000,
                },
            resave: false,
            saveUninitialized: false
        }
    )
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/admin",admin_router);
app.use("/",home_router);

app.listen(port,ip,function(){console.log("Sever starts at "+ip+':'+port)});

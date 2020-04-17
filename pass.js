var passport = require('passport');
var Strategy = require('passport-local').Strategy;

const adminDB = require('./settings').admin_panel;

passport.use(new Strategy(
    function(u, p, cb) {
        if (adminDB.login === u && adminDB.pass === p) { return cb(null, adminDB); }
        else
            return cb(null, false);
    }));

passport.serializeUser(function(user, cb) {
    cb(null, user.login);
});

passport.deserializeUser(function(login, cb) {
    const admin = (adminDB.login === login) ? adminDB : false;
    cb(null, admin);
});
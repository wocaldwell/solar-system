"use strict";

let firebase = require("firebase/app"),
    fb = require("./firebase-getter"),
    fbData = fb();

require("firebase/auth");
require("firebase/database");

var configure = {
apiKey: fbData.apiKey,
authDomain: fbData.authDomain,
databaseURL: fbData.databaseUrl

};

firebase.initializeApp(configure);


module.exports = {firebase};
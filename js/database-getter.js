"use strict";

let $ = require('jquery');


// function that gets the information from firebase
function getPlanetsDB() {
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: `https://solarsytem-3e23a.firebaseio.com/planets.json`,
            type: "GET"
        }).done(function(planetsData) {
            resolve(planetsData);
        }).fail(function(error) {
            console.log('Something went VERY wrong in getPlanetsDB');
            reject(error);
        });
    });
}

module.exports = {getPlanetsDB};
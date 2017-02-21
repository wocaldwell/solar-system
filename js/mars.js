"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getMarsInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start mars stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in mars');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Mars") {
                    // variable that stores specific planet object
                    let marsInfo = allPlanets[i];
                    resolve(marsInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getMarsInfo()
        .then(function(marsInfo) {
            // variable that stores the atmosphere object
            let marsGasses = marsInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(marsGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(marsGasses),
                // variable that stores satalite array
                marsMoons = marsInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                marsVisitors = marsInfo.visitors;
            domElement.append(`
                                <h2>${marsInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${marsInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${marsInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${marsInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < marsMoons.length; i++) {
                domElement.append(`<p>${marsMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < marsVisitors.length; i++) {
                domElement.append(`<p>${marsVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
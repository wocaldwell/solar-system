"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getMercuryInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start mercury stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in mercury');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Mercury") {
                    // variable that stores specific planet object
                    let mercuryInfo = allPlanets[i];
                    resolve(mercuryInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getMercuryInfo()
        .then(function(mercuryInfo) {
            // variable that stores the atmosphere object
            let mercuryGasses = mercuryInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(mercuryGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(mercuryGasses),
                // variable that stores satalite array
                mercuryMoons = mercuryInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                mercuryVisitors = mercuryInfo.visitors;
            domElement.append(`
                                <h2>${mercuryInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${mercuryInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${mercuryInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${mercuryInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < mercuryMoons.length; i++) {
                domElement.append(`<p>${mercuryMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < mercuryVisitors.length; i++) {
                domElement.append(`<p>${mercuryVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
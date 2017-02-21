"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getJupiterInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start jupiter stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in jupiter');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Jupiter") {
                    // variable that stores specific planet object
                    let jupiterInfo = allPlanets[i];
                    resolve(jupiterInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getJupiterInfo()
        .then(function(jupiterInfo) {
            // variable that stores the atmosphere object
            let jupiterGasses = jupiterInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(jupiterGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(jupiterGasses),
                // variable that stores satalite array
                jupiterMoons = jupiterInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                jupiterVisitors = jupiterInfo.visitors;
            domElement.append(`
                                <h2>${jupiterInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${jupiterInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${jupiterInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${jupiterInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < jupiterMoons.length; i++) {
                domElement.append(`<p>${jupiterMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < jupiterVisitors.length; i++) {
                domElement.append(`<p>${jupiterVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
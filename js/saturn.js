"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getSaturnInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start saturn stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in saturn');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Saturn") {
                    // variable that stores specific planet object
                    let saturnInfo = allPlanets[i];
                    resolve(saturnInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getSaturnInfo()
        .then(function(saturnInfo) {
            // variable that stores the atmosphere object
            let saturnGasses = saturnInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(saturnGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(saturnGasses),
                // variable that stores satalite array
                saturnMoons = saturnInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                saturnVisitors = saturnInfo.visitors;
            domElement.append(`
                                <h2>${saturnInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${saturnInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${saturnInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${saturnInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < saturnMoons.length; i++) {
                domElement.append(`<p>${saturnMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < saturnVisitors.length; i++) {
                domElement.append(`<p>${saturnVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getNeptuneInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start neptune stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in neptune');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Neptune") {
                    // variable that stores specific planet object
                    let neptuneInfo = allPlanets[i];
                    resolve(neptuneInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getNeptuneInfo()
        .then(function(neptuneInfo) {
            // variable that stores the atmosphere object
            let neptuneGasses = neptuneInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(neptuneGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(neptuneGasses),
                // variable that stores satalite array
                neptuneMoons = neptuneInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                neptuneVisitors = neptuneInfo.visitors;
            domElement.append(`
                                <h2>${neptuneInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${neptuneInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${neptuneInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${neptuneInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < neptuneMoons.length; i++) {
                domElement.append(`<p>${neptuneMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < neptuneVisitors.length; i++) {
                domElement.append(`<p>${neptuneVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
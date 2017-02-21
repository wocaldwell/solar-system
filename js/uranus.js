"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getUranusInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start uranus stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in uranus');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Uranus") {
                    // variable that stores specific planet object
                    let uranusInfo = allPlanets[i];
                    resolve(uranusInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getUranusInfo()
        .then(function(uranusInfo) {
            // variable that stores the atmosphere object
            let uranusGasses = uranusInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(uranusGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(uranusGasses),
                // variable that stores satalite array
                uranusMoons = uranusInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                uranusVisitors = uranusInfo.visitors;
            domElement.append(`
                                <h2>${uranusInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${uranusInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${uranusInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${uranusInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < uranusMoons.length; i++) {
                domElement.append(`<p>${uranusMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < uranusVisitors.length; i++) {
                domElement.append(`<p>${uranusVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
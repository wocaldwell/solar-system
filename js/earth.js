"use strict";

let $ = require('jquery'),
    database = require("./database-getter.js");

// function that filters data to specific planet info
function getEarthInfo() {
    return new Promise(function(resolve, reject) {
        console.log('start earth stuff');
        database.getPlanetsDB()
        .then(function (planetsData) {
            console.log('got the planets stuff in earth');
            // variable that stores data from firebase db (the planet objects) in an array
            let allPlanets = Object.values(planetsData);
            // iterate through the planet objects and find a specific planet
            for (var i =0; i < allPlanets.length; i++) {
                if (allPlanets[i].name === "Earth") {
                    // variable that stores specific planet object
                    let earthInfo = allPlanets[i];
                    resolve(earthInfo);
                }
            }
        });
    });
}

// function that formats information on the specific planet
function outputTo(domElement) {
    return new Promise(function(resolve, reject){
        getEarthInfo()
        .then(function(earthInfo) {
            // variable that stores the atmosphere object
            let earthGasses = earthInfo.atmosphere,
                // variable that stores an array of the gas names
                gasKeys = Object.keys(earthGasses),
                // variable that stores an array of the gas percentages
                gasValues = Object.values(earthGasses),
                // variable that stores satalite array
                earthMoons = earthInfo.satalites,
                // variable that stores visitors array (man-made satalites, etc.)
                earthVisitors = earthInfo.visitors;
            domElement.append(`
                                <h2>${earthInfo.name}</h2>
                                <h5>Discovery: </h5>
                                <p>${earthInfo.discovered}</p>
                                <h5>Mass: </h5>
                                <p>${earthInfo.mass}</p>
                                <h5>Distance to closest star(the sun): </h5>
                                <p>${earthInfo.distance}</p>
                                <h5>Atmosphere: </h5>`);
            // iterate through the gases and append them to DOM
            for (let i = 0; i < gasKeys.length; i++) {
                domElement.append(`<p>${gasKeys[i]} : ${gasValues[i]}</p>`);
            }
            domElement.append(`<h5>Natural Satalites: </h5>`);
            // iterate through satalites and append to DOM
            for (let i = 0; i < earthMoons.length; i++) {
                domElement.append(`<p>${earthMoons[i]}</p>`);
            }
            domElement.append(`<h5>Human exploration: </h5>`);
            // iterate through visitors and append them to DOM
            for (let i = 0; i < earthVisitors.length; i++) {
                domElement.append(`<p>${earthVisitors[i]}</p>`);
            }
            domElement.append(`<hr>`);
            resolve();
        });
    });
}

module.exports = {outputTo};
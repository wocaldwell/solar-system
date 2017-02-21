"use strict";

let $ = require('jquery'),
    solarSystem = $("#solar-system"),
    mercury = require("./mercury.js"),
    venus = require("./venus.js"),
    earth = require("./earth.js"),
    mars = require("./mars.js"),
    jupiter = require("./jupiter.js"),
    saturn = require("./saturn.js"),
    uranus = require("./uranus.js"),
    neptune = require("./neptune.js");

// get().then(
//     function () {
//         // Output all the things
//     }
// )

mercury.outputTo(solarSystem)
.then(venus.outputTo(solarSystem))
.then(earth.outputTo(solarSystem))
.then(mars.outputTo(solarSystem))
.then(jupiter.outputTo(solarSystem))
.then(saturn.outputTo(solarSystem))
.then(uranus.outputTo(solarSystem))
.then(neptune.outputTo(solarSystem));
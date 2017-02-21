"use strict";

let $ = require('jquery'),
    solarSystem = $("#solar-system"),
    earth = require("./earth.js"),
    mars = require("./mars.js"),
    jupiter = require("./jupiter");

earth.outputTo(solarSystem)
.then(mars.outputTo(solarSystem))
.then(jupiter.outputTo(solarSystem));
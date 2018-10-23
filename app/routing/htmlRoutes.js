var path = require("path");
var express = require("express");

module.exports = function (app) {

    app.use(express.static(__dirname + "/../public"));

    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });

    app.get("/survey", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
    });

    // for when the path doesn't match any correct route...it will route to the home page
    app.get("*", function (req, res) {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
    });
}
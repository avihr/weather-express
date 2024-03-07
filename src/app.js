import express from "express";
import path from "path";
import hbs from "hbs";
import { forecast } from "./utils/forecast.js";
import { readFileSync } from "fs";

const app = express();

const directory = import.meta.dirname;

const port = process.env.PORT || 3000;

const publicDirPath = path.join(directory, "../public");
const viewsPath = path.join(directory, "../templates/views");
const partaislPath = path.join(directory, "../templates/partials");
const assetsPath = path.join(directory, "./assets");

app.use(express.static(publicDirPath));

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partaislPath);

app.get("", (req, res) => {
    res.render("index", {
        title: "Weather",
        name: "Avinash H R",
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        name: "Avinash H R",
        title: "About",
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        message: "Help from variable",
        title: "Help",
        name: "Avinash H R",
    });
});

app.get("/weather", (req, res) => {
    if (!req.query.location)
        return res.send({
            error: "Loacation not provided",
        });
    forecast(req.query.location, (err, weatherInfo = {}) => {
        if (err) {
            res.send({
                error: "Could not find location",
            });
        } else {
            const weatherCodes = readFileSync(
                assetsPath + "/weatherCodes.json"
            );
            const weatherCodesJson = JSON.parse(weatherCodes.toString());
            const { weatherCode: summaryCode } = weatherInfo.data.values;
            res.send({
                weatherInfo,
                summary: weatherCodesJson["weatherCode"][summaryCode],
            });
        }
    });
});

app.get("/help/*", (req, res) => {
    res.render("notFound", {
        message: "Help article not found",
        name: "Avinash H R",
        title: "Not Found",
    });
});

app.get("*", (req, res) => {
    res.render("notFound", {
        message: "404 Page not found",
        name: "Avinash H R",
        title: "Not Found",
    });
});

app.listen(port, () => {
    console.log("Server up on port 3000");
});

const express = require("express");
const bp = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bp.urlencoded({ extended: true }));
app.set("view Engine", "ejs");

app.get("/", (req, res) => {
  res.render("weather.ejs", {
    cityName: "- -",
    state: "- -",
    country: "- -",
    tempreture: "- -",
    condition: "- -",
    day: "- -",
    date: "- -",
    windSpeed: "- -",
    windDir: "- -",
    humadity: "- -",
    pressure: "- -",
    errstate: false,
  });
});

app.post("/", (req, res) => {
  const location = req.body.location;
  var dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date();
  var dt = date.getDate();
  var week = date.getDay();
  var month = date.getMonth();
  var year = date.getFullYear();
  var mth = monthNames[month];
  const weatherApi = `https://api.weatherapi.com/v1/forecast.json?key=a69f7e6cf31343e6b7d124952232609&q=${location}&days=7`;

  axios
    .get(weatherApi)
    .then((response) => {
      // const data = response.data;
      //console.log(response.data);
      res.render("weather.ejs", {
        cityName: response.data.location.name,
        state: response.data.location.region,
        country: response.data.location.country,
        tempreture: response.data.current.temp_c + "°c",
        condition: response.data.current.condition.text,
        day: dayNames[week],
        date: dt + " " + mth + " " + year,
        windSpeed: response.data.current.wind_kph + " km/h",
        windDir: response.data.current.wind_dir,
        humadity: response.data.current.humidity + "%",
        pressure: response.data.current.pressure_in + "%",
        errstate: false,
      });
    })
    .catch((e) => {
      res.render("weather.ejs", {
        cityName: "- -",
        state: "- -",
        country: "- -",
        tempreture: "- -",
        condition: "- -",
        day: "- -",
        date: "- -",
        windSpeed: "- -",
        windDir: "- -",
        humadity: "- -",
        pressure: "- -",
        errstate: true,
      });
    });
});

app.listen(3000, () => {
  console.log("Server runs on port 3000");
});

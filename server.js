const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const utils = require("./utils/busStops");
const path = require("path");

const PORT = process.env.PORT || 3000;

const rootUrl = "http://datamall2.mytransport.sg/ltaodataservice";

app.get("/api/bus-stops", async (req, res) => {
  const { lat, long } = req.query;

  await axios
    .get(rootUrl + "/BusStops", {
      headers: {
        AccountKey: process.env.ACCOUNT_KEY,
      },
    })
    .then(async ({ data }) => {
      function addDistanceToBusStops(busStops) {
        for (let i = 0; i < busStops.length; i++) {
          const { Latitude, Longitude } = busStops[i];

          busStops[i]["Distance"] = utils.calculateDistance(
            Latitude,
            Longitude,
            parseFloat(lat),
            parseFloat(long),
            "K"
          );
        }

        return busStops
          .filter((busStop) => {
            if (busStop.Distance <= 1.2) return busStop;
          })
          .sort((a, b) => a.Distance - b.Distance);
      }

      const nearby = addDistanceToBusStops(data.value);
      res.status(200).json(nearby);
    })
    .catch((err) => console.log(err));
});

app.get("/api/buses", async (req, res) => {
  const { busStopCode } = req.query;

  await axios
    .get(rootUrl + `/BusArrivalv2?BusStopCode=${busStopCode}`, {
      headers: {
        AccountKey: process.env.ACCOUNT_KEY,
      },
    })
    .then(({ data: { Services } }) => {
      return res.status(200).json(Services);
    })
    .catch((err) => console.log(err));
});

app.get("/api/places", async (req, res) => {
  const { input } = req.query;

  if (input) {
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&components=country:sg&key=${process.env.GOOGLE_API_KEY}`
      )
      .then(({ data: { predictions } }) => {
        console.log(predictions);
        res.status(200).json(predictions);
      })
      .catch((err) => console.log(err.message));
  }
});

app.get("/api/directions", async (req, res) => {
  const { origin, destination, mode } = req.query;
  const modes = [];
  if (origin && destination) {
    await axios
      .get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&mode=${mode}&key=${process.env.GOOGLE_API_KEY}`
      )
      .then(({ data }) => {
        res.status(200).json(data);
      })
      .catch((err) => console.log(err));
  }
});

app.use(express.static(__dirname + "/dist"));

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

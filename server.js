const express = require("express");
const app = express();
const axios = require("axios");
require("dotenv").config();
const utils = require("./utils/busStops");

const PORT = process.env.PORT || 3000;

const rootUrl = "http://datamall2.mytransport.sg/ltaodataservice";

app.get("/bus-stops", async (req, res) => {
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

app.get("/buses", async (req, res) => {
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

app.listen(PORT, () => {
  console.log("Listening on port 3000");
});

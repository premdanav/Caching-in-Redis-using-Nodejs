const express = require("express");
const dotenv = require("dotenv");
const redis = require("redis");
const axios = require("axios");

const PORT = process.env.PORT || 5000;
const REDIS_PORT = process.env.REDIS_PORT || 6379;

const client = redis.createClient(REDIS_PORT);
dotenv.config({ path: ".env" });
const app = express();

const getRepos = async (req, res, next) => {
  try {
    console.log(`fetching data`);
    const startTime = new Date();

    const { username } = req.params;

    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    const data = response.data;
    const finishTime = new Date();
    const duration = finishTime - startTime;

    res.status(200).send({ id: data?.id, duration: `${duration} ms` });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

app.get("/repos/:username", getRepos);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

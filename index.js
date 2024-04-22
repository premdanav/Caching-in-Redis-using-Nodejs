const express = require("express");
const dotenv = require("dotenv");
const axios = require("axios");

const PORT = process.env.PORT || 5000;

dotenv.config({ path: ".env" });

const app = express();

const getPosts = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://jsonplaceholder.typicode.com/posts`
    );
    const data = response.data;

    res.status(200).send({ data: data });
  } catch (error) {
    console.log(error);
    res.status(500);
  }
};

app.get("/posts", getPosts);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});

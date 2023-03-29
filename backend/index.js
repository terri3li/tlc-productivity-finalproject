"use strict";

const express = require("express");
const morgan = require("morgan");
const port = 8880;

express()
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  // probably won't need
  .use(express.static("public"))

  .get("/test", (req, res) => {
    res.status(200).json({
      message: "Helllllo",
    });
  })

  // catch all
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(port, () => console.log(`Listening on port ${port}`));

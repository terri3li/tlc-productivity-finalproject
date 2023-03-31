"use strict";

const express = require("express");
const morgan = require("morgan");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(
  "889524735523-df4ntc3spc6lo313qbp2pclqm8b01up9.apps.googleusercontent.com",
  "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"
);

OAuth2Client.setCredentials({
  refresh_token:
    "1//04zXIdzKfIzy7CgYIARAAGAQSNwF-L9Irw8bDyiD04jocm6q9AchtEiaDYxIliyNtpiOWcI0I7F8fcjtEHZziZKL6DM641RIX77A",
});

const calendar = google.calendar({version: 'v3', auth: OAuth2Client })

const port = 8880;

const { addUser, checkForUser } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  // probably won't need
  .use(express.static("public"))

  .get("/get-user/:userUsername", checkForUser)
  .post("/new-user", addUser)

  // catch all
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(port, () => console.log(`Listening on port ${port}`));

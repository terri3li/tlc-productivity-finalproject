"use strict";

const express = require("express");
const morgan = require("morgan");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2(
  "",
  ""
);




const port = 5678;

const { addUser, checkForUser, updateRewards, updateToDos, updateTasks } = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  // probably won't need
  .use(express.static("public"))

  .get("/get-user/:userEmail", checkForUser)
  .post("/new-user", addUser)

  .patch("/get-user/rewards/:userEmail", updateRewards)
  .patch("/get-user/toDos/:userEmail", updateToDos)
  .patch("/get-user/tasks-completed/:userEmail", updateTasks)
 
  // catch all
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })


  .listen(port, () => console.log(`Listening on port ${port}`));

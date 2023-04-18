"use strict";

const express = require("express");
const morgan = require("morgan");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;
const OAuth2Client = new OAuth2("", "");

const port = 5678;

const {
  addUser,
  checkForUser,
  updateRewards,
  updateToDos,
  updateTasks,
  updateMonthlys,
  updateWeeklys,
  updateMonthlyToDo,
  updateWeeklyToDo,
  updateName
} = require("./handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())
  .use(express.static("public"))

  .get("/get-user/:userEmail", checkForUser)
  .post("/new-user", addUser)

  .patch("/get-user/real-name/:userEmail", updateName)
  .patch("/get-user/rewards/:userEmail", updateRewards)
  .patch("/get-user/toDos/:userEmail", updateToDos)
  .patch("/get-user/tasks-completed/:userEmail", updateTasks)
  .patch("/get-user/monthlys-completed/:userEmail", updateMonthlys)
  .patch("/get-user/weeklys-completed/:userEmail", updateWeeklys)
  .patch("/get-user/monthly-to-do/:userEmail", updateMonthlyToDo)
  .patch("/get-user/weekly-to-do/:userEmail", updateWeeklyToDo)

  // catch all
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(port, () => console.log(`Listening on port ${port}`));

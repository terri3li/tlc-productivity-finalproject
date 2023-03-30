"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ToDo-List");

    const newUser = {
      _id: uuidv4(),
      username: "",
      email: "",
      toDo: []
    };

    await db.collection("users").insertOne(newUser);

    if (updatedResult.matchedCount === 0) {
      return res.status(404).json({ status: 404 });
    } else if (updatedResult.modifiedCount === 0) {
      return res.status(409).json({ status: 409 });
    } else if (
      updatedResult.matchedCount === 1 &&
      updatedResult.modifiedCount === 1
    ) {
      client.close();
      res.status(201).json({
        status: 201,
        message: "Reservation complete!",
      });
    }
  } catch (error) {
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addUser,
};

"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//------ check to see if user already exists

const checkForUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const userUserame = req.params.userUsername;
console.log(userUserame)
  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({_id: userUsername});

    //if user exists return user info
    if (findUser) {
      client.close();
      res.status(200).json({
        status: 200,
        data: findUser,
        message: "User already exists",
      });
    }
    //if user doesn't exist then re-route to add them
    else {
      res.status(404).json({
        status: 404,
        message: "Need to add user",
      });
    }
  } catch {
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

//// ---- below is working in insomnia, need to get data from above in here 

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ToDo-List");

    const newUser = {
      _id: uuidv4(),
      username: "",
      email: "",
      toDo: [],
    };

    await db.collection("users").insertOne(newUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "New user added!",
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

module.exports = {
  addUser,
  checkForUser,
};

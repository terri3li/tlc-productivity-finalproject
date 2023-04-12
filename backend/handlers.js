"use strict";

const { v4: uuidv4 } = require("uuid");
const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

////---- check for user & GET info/status

const checkForUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

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
      res.status(200).json({
        status: 200,
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

//// ---- POST add new user

const addUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);

  try {
    await client.connect();
    const db = client.db("ToDo-List");

    const newUser = {
      _id: uuidv4(),
      username: req.body.username,
      email: req.body.email,
      rewards: req.body.rewards,
      toDos: req.body.toDos,
      monthlyToDo: req.body.monthlyToDo,
      weeklyToDo: req.body.weeklyToDo,
      tasksCompleted: req.body.tasksCompleted,
      weeklysCompleted: req.body.weeklysCompleted,
      monthlysCompleted: req.body.monthlysCompleted,
     
  
    };

    await db.collection("users").insertOne(newUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "New user added!",
      data: newUser,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

////---- PATCH user; update user rewards

const updateRewards = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });
    console.log(findUser);

    const updateUser = {
      $set: {
        rewards: req.body.rewards,
      },
    };

    const updatedUser = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedUser,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

////---- PATCH user; update user to dos

const updateToDos = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

    const updateUser = {
      $set: {
        toDos: req.body.toDos,
      },
    };

    const updatedList = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedList,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};


//---- PATCH user; update user tasks completed

const updateTasks = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

    const updateUser = {
      $set: {
        tasksCompleted: req.body.tasksCompleted,
      },
    };

    const updatedList = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedList,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

//---- PATCH user; update user monthlys completed

const updateMonthlys = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

    const updateUser = {
      $set: {
        monthlysCompleted: req.body.monthlysCompleted,
      },
    };

    const updatedList = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedList,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

//---- PATCH user; update user monthlys completed

const updateWeeklys = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

    const updateUser = {
      $set: {
        weeklysCompleted: req.body.weeklysCompleted,
      },
    };

    const updatedList = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedList,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};


////---- PATCH user; monthly goal

const updateMonthlyToDo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

    const updateUser = {
      $set: {
        monthlyToDo: req.body.monthlyToDo,
      },
    };

    const updatedList = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedList,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

////---- PATCH user; weekly goal

const updateWeeklyToDo = async (req, res) => {
  const client = new MongoClient(MONGO_URI, options);
  const email = req.params.userEmail;

  try {
    await client.connect();
    const db = client.db("ToDo-List");
    const findUser = await db.collection("users").findOne({ email: email });

    const updateUser = {
      $set: {
        weeklyToDo: req.body.weeklyToDo,
      },
    };

    const updatedList = await db
      .collection("users")
      .updateOne(findUser, updateUser);

    client.close();
    res.status(201).json({
      status: 201,
      message: "User Updated!",
      data: updatedList,
    });
  } catch (e) {
    console.log(e);
    res.status(400).json({
      status: 400,
      message: "Something went wrong",
    });
  }
};

///////////////////

module.exports = {
  addUser,
  checkForUser,
  updateRewards,
  updateToDos,
  updateTasks,
  updateMonthlys,
  updateWeeklys,
  updateMonthlyToDo,
  updateWeeklyToDo
};

const {users} = require("/Users/terri3li/Documents/Bootcamp/Final Project/tlc-productivity-finalproject/backend/users.js");
const { MongoClient } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const batchImport = async () => {
  const client = new MongoClient(MONGO_URI, options);
  try {
    console.log(users)
    await client.connect();
    const db = client.db("ToDo-List");
    const result = await db.collection("users").insertMany(users);

    console.log("success");
    client.close();
  } catch (error) {
    console.log(error);
  }
};

batchImport();
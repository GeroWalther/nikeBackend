const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

console.log();
const client = new MongoClient(process.env.MONGODB_URL);

const database = client.db("test");
const products = database.collection("products");

module.exports = {
  products,
};

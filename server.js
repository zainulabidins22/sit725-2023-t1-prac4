const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Mongo Atlas Connection URL
const uri = "mongodb+srv://sheikhzain:zain%401234@zain-deakin-uni.4xornvl.mongodb.net/test";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// On Successful Connection
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB Atlas database connection established successfully");
});

const cardSchema = new mongoose.Schema({
  title: String,
  image: String,
  link: String,
  description: String,
});


const Card = mongoose.model("Card", cardSchema);

// API endpoint to get projects from the database
app.get("/api/projects", async (req, res) => {
  try {
    const cardList = await Card.find();
    res.json({ statusCode: 200, data: cardList, message: "Success" });
  } catch (error) {
    res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("App listening to: " + port);
});

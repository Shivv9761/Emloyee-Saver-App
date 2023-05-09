const express = require("express");
require("dotenv").config();
const dbConnect = require("./config/database");
const userRoutes = require("./routes/user");
const app = express();
var cors = require("cors");
const PORT = process.env.PORT || 4000;
const path = require("path");

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.static('public'));

// Middleware
app.use(express.json());

app.use("/api/v1", userRoutes);

// CORS Configuration

dbConnect();

// app.get("/", (req, res) => {
//   res.send(`<h1>Backend is Running and this is '/' Route</h1>`);
// });

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/frontend/build/index"));

app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);

app.listen(PORT, () => {
  console.log(`THE SERVER IS UP AND RUNNING AT PORT ${PORT}`);
});
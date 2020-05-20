const express = require("express");
const app = express();

const db = require("./database/database");
require("dotenv").config();

// Router
const administrators = require("./routes/api/administrators");
const auth = require("./routes/api/auth");

try {
  db.authenticate();
  console.log("Connected to the database");
} catch (error) {
  console.error("Unable to connect to the database", error);
}

// Body Parser For User Input
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Routes To API
app.use("/api/auth", auth);
app.use("/api/administrators", administrators);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});

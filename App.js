const express = require("express");
const app = express();

const db = require("./database/database");
require("dotenv").config();

// Router
const administrators = require("./routes/api/administrators");
const akun = require("./routes/api/akun");
const anggota = require("./routes/api/anggota");
const dokumen = require("./routes/api/dokumen");
const tamu = require("./routes/api/tamu");
const pengunjung = require("./routes/api/pengunjung");
const event = require("./routes/api/event");
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
app.use("/api/anggota", anggota);
app.use("/api/event", event);
app.use("/api/dokumen", dokumen);
app.use("/api/akun", akun);
app.use("/api/tamu", tamu);
app.use("/api/pengunjung", pengunjung);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Started on PORT ${port}`);
});

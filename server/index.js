require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;
const db = require("./src/config/db");
const route = require("./src/routes/index");

app.use(express.json());
app.use(cors());
// Connect DB
db.connect();

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});

route(app);

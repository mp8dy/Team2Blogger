const express = require("express");
const cors = require("cors");
const port = 5000;
const app = express();

const db = require("../firebase.js");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const ItemController = require("./controllers/items.js");
const UserController = require("./controllers/users.js");

ItemController(app, db);
UserController(app, db);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

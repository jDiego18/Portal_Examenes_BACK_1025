const express = require("express");
require("dotenv").config();

const app = express();
app.use(express.json());

// Importar rutas
const routes = require("./routes");
app.use("/", routes);

module.exports = app;
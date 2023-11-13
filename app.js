const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const verifyToken = require('./middleware/middleware');
require('dotenv').config();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '20mb' }));

/* const verifyToken = require('./middleware/middleware'); // Importar el middleware verifyToken */

// Importa las rutas
const r_login = require("./routes/login/login");
const r_user = require("./routes/users/user");
const r_testA = require("./routes/testA/main");
const r_testB = require("./routes/testB/main");
const r_testSleep = require("./routes/testSleep/main");

// Direccion de Prueba
app.get("/api/test", (req, res) => {
  res.send("El Servidor esta bien prendido");
});

// Rutas desprotegidas 
app.use("/guide/api/login", r_login);
app.use("/guide/api/user", r_user);
app.use("/guide/api/testA", r_testA);
app.use("/guide/api/testB", r_testB);
app.use("/guide/api/testSleep", r_testSleep);

app.listen(80, () => {
  console.log("Bien Prendido")
});



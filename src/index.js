const express = require("express"); //ya no se necesita body-parser, express puede renderizar json
const morgan = require("morgan");
const path = require("path");

const { mongoose } = require("./database"); //Requiero mongoose de mi archivo database

const app = express();

//Settings
app.set("port", process.env.PORT || 3000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json()); //aca express mostrando json

//Routes
app.use("/api/tasks", require("./routes/taskRoutes"));

//Static files
app.use(express.static(path.join(__dirname + "/public")));

//Starting server

app.listen(app.get("port"), () => {
  console.log(`server on port ${app.get("port")}`);
});

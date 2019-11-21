const mongoose = require("mongoose"); //requiero mongoose
const { Schema } = mongoose; // de mongoose requiero Schema

const TaskSchema = new Schema({
  title: { type: String, required: true }, //required: true es = q allowNull: false
  description: { type: String, required: true }
});

module.exports = mongoose.model("Task", TaskSchema); //1er parametro: le doy nombre al esquema, 2do: le digo como va a ser. y lo exporto

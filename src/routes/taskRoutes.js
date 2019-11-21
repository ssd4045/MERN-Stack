const express = require("express");
const router = express.Router();

const Task = require("../models/task"); //requiero el modelo q defini

router.get("/", async (req, res) => {
  // le digo q la consulta va a tomar tiempo con "async"
  const tasks = await Task.find();
  // le digo q espere la res con "await" y q cuando la tenga la guarde en tasks
  res.json(tasks);
  //y q me la muestre
});

//quiero una ruta q si le pongo un id de la task me traiga esa task especifica
router.get("/:id", async (req, res) => {
  //le digo: -ey, ahi te va un pedido asincronico!-
  const task = await Task.findById(req.params.id);
  //le digo q cuando lo tenga q me lo guarde en la constante task
  res.json(task);
  //le muestro al cliente la task q encontre
});

router.post("/", async (req, res) => {
  const { title, description } = req.body;
  //voy a recibir por req.body "title" y "description" xq es lo q el cliente me esta enviando
  const task = new Task({ title, description });
  //con eso voy a crear una nueva task usando el modelo Task y lo guardo en una constante
  await task.save();
  // con .save vamos a guardar esa task en la base de datos
  res.json({ status: "Task Saved" });
});

//Ej de como usar postman:
//abro el postman de chrome y le hago un pedido GET a http://localhost:3000/api/tasks
//Hago un pedido POST a la misma url asi y le pongo:
//en Headers el Content-Type va a ser application/json
//en Body selecciono "raw" y le escribo un objeto xq estamos en formato json:
/*
{
"title": "cenar",
"description":"voy a cenar"
} */
//y eso voy a recibir y guardar en la constante task y con .save() se guarda en la base de datos
//dsp si hago un pedido GET a la misma url me va a dar un json con esa task

router.put("/:id", async (req, res) => {
  //le aviso q esto va a ser asincronico
  //ahora si yo quiero actualizar una task hago un pedido PUT y le paso el id de la task
  const { title, description } = req.body;
  //voy a recibir por req.body "title" y "description" xq es lo q el cliente me esta enviando
  const newTask = { title, description };
  //con eso voy a crear una nueva task usando el modelo Task y lo guardo en una constante
  console.log(req.params.id);
  //me muestra el id q le pase por parametro, el id me lo creo mongo
  await Task.findByIdAndUpdate(req.params.id, newTask);
  //le digo q encuentre la task con el id q pase por parametro y q lo actualice con la newTask q le mande
  //le mando un await para que espere a la respuesta para seguir
  res.json({ status: "Task Updated" });
});

router.delete("/:id", async (req, res) => {
  //ruta para borrar: le digo -ey, guarda q voy a hacer un pedido asincronico- as usual
  await Task.findByIdAndRemove(req.params.id);
  //y le digo -espera!- con un await, y q encuentre la tarea con id q le pase y la borre
  res.json({ status: "Task Deleted" });
  // y mando esta respuesta para q el cliente sepa q pasa
});

module.exports = router;

const mongoose = require("mongoose");

//en la terminal inicializo mongo (si ya lo tengo instalado) poniendo mongod, en linux: sudo service mongod start

const URI = "mongodb://localhost/mern-tasks"; //pongo la direccion de mi db en una constante por si quisiera cambiarla. si estamos consultando o creando un dato en una db q no existe mongo la crea

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  //se la paso a mongoose y hay q pasarle esos cosos xq lo contrario esta deprecado
  .then(db => console.log("DB is connected")) //Si se puede conectar me consologuea esto
  .catch(er => console.error(err)); //Si no me muestra el error por consola

module.exports = mongoose;

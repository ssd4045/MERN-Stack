import React from "react";
import { render } from "react-dom"; //requiero render de react-dom (todo desestructurado)
import App from "./App";

render(<App />, document.getElementById("app"));
//para q se renderice en la pantalla el componente App se lo paso al metodo render
// y como 2do parametro le digo donde va a ir montado:
//en el div con id app del index.html de la carpeta public

module.exports = {
  entry: "./src/app/index.js",
  output: {
    path: __dirname + "/src/public",
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      }
    ]
  }
};

//en nuestra config d webpack:
//vamos a crear una propiedad "module" q sera un objeto q tiene un array de objetos llamado "rules"
//donde cada objeto es una configuracion adicional a webpack, para decirle q tiene q hacer:
//q utilice babel-loader

//test: /\.js$/ >>> esto es una expresion regular,
//es para decirle q tome todos los archivos de js q encuentre
//exclude: /node_modules/ >>> pero q NO tome, q excluya, los archivos de la carpeta node_modules

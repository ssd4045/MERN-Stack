import React, { Component } from "react"; //requiero React y Component de react

class App extends Component {
  constructor() {
    super();
    this.state = {
      title: "",
      description: "",
      tasks: [],
      _id: ""
    };
    this.addTask = this.addTask.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.editTask = this.editTask.bind(this);
  }

  //componentDidMount:
  //evento relacionado al ciclo de vida de mi aplicacion, de lo primerito q hace
  //apenas nuestra aplicacion carga ejecuta el componentDidMount,
  //lo uso en este caso xq quiero que apenas mi aplicacion sea montada utilice "fetchTasks"
  //y asi pueda tener las tareas y las muestre.

  componentDidMount() {
    this.fetchTasks();
  }

  addTask(e) {
    if (this.state._id) {
      fetch(`/api/tasks/${this.state._id}`, {
        method: "PUT",
        body: JSON.stringify(this.state),
        headers: {
          Accept: "application/json",
          "Content-type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => M.toast({ html: "Task Updated" }));
      this.setState({ title: "", description: "", _id: "" });
      this.fetchTasks();
    } else {
      fetch("/api/tasks", {
        //fetch (metodo del navegador, latest version)>>> enviamos el state a "api/tasks"
        method: "POST", //Voy a enviar una peticion POST a la direccion q le pase arriba
        body: JSON.stringify(this.state), //le envio un body que es un string, stringficamos el json con el state
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        } //con headers le digo el tipo de contenido q le voy a enviar, le voy a enviar un json
      })
        .then(res => res.json()) //cuando responda algo quiero verlo
        .then(data => {
          console.log(data);
          M.toast({ html: "Task Saved" }); //una notificacion por pantalla de Materialize !!! beautiful *u*
          this.setState({ title: "", description: "" });
          this.fetchTasks();
        })
        .catch(err => console.error(err)); //si hay un error mostralo por consola
    }

    e.preventDefault();
  }

  fetchTasks() {
    //Esta vez no necesitamos un objeto de configuracion como el de addTask
    fetch("/api/tasks") //xq por defecto, al hacer el metodo fetch va a hacer una peticion GET
      .then(res => res.json()) //cuando tenga la respuesta, lo convierto en un json
      .then(data => {
        this.setState({ tasks: data });
        console.log(this.state.tasks);
      })
      .catch(err => {
        console.error(err);
      });
  }

  deleteTask(id) {
    //Le hago un pedido DELETE a api/task/:id
    if (confirm("Are you sure you want to delete it?")) {
      fetch("/api/tasks/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      })
        .then(res => res.json())
        .then(data => {
          M.toast({ html: "Task Deleted" });
          this.fetchTasks();
        });
    }
  }

  editTask(id) {
    fetch("/api/tasks/" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          title: data.title,
          description: data.description,
          _id: data._id
        });
      });
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>
        {/* NAVIGATION */}
        <nav className="light-blue darken-4">
          <div className="container">
            <a className="brand-logo" href="/">
              MERN Stack{" "}
            </a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s5">
              <div className="card">
                <div className="card-content">
                  <form onSubmit={this.addTask}>
                    <div className="row">
                      <div className="input-field col s12">
                        <input
                          name="title"
                          value={this.state.title}
                          onChange={this.handleChange}
                          type="text"
                          placeholder="Task Title"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12">
                        <textarea
                          onChange={this.handleChange}
                          name="description"
                          value={this.state.description}
                          className="materialize-textarea"
                          placeholder="Task Description"
                        />
                      </div>
                    </div>
                    <button type="submit" className="btn light-blue darken-4">
                      Send
                    </button>
                  </form>
                </div>
              </div>
            </div>
            <div className="col s7">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {this.state.tasks.map(task => {
                    return (
                      <tr key={task._id}>
                        <td>{task.title}</td>
                        <td>{task.description}</td>
                        <td>
                          <button
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                            onClick={() => this.deleteTask(task._id)}
                          >
                            <i className="material-icons">delete</i>
                          </button>
                          <button
                            onClick={() => this.editTask(task._id)}
                            className="btn light-blue darken-4"
                            style={{ margin: "4px" }}
                          >
                            <i className="material-icons">edit</i>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
